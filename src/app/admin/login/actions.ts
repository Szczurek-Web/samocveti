'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminAuth, createAdminSessionToken } from '@/lib/admin-auth';

const MAX_LOGIN_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS = 15 * 60 * 1000; // temporary lock for 15 minutes
const SAFE_AUTH_ERROR_MESSAGE =
  'Не удалось выполнить вход. Проверьте данные и попробуйте снова позже.';

type LoginRateLimitEntry = {
  attempts: number;
  firstAttemptAt: number;
  blockedUntil: number | null;
};

interface LoginRateLimitStorage {
  get(key: string): Promise<LoginRateLimitEntry | null>;
  set(key: string, value: LoginRateLimitEntry): Promise<void>;
  delete(key: string): Promise<void>;
}

/**
 * TODO (production): replace with persistent shared storage
 * (Upstash/Redis/Postgres table) so limits are consistent across instances.
 */
class InMemoryLoginRateLimitStorage implements LoginRateLimitStorage {
  private readonly store = new Map<string, LoginRateLimitEntry>();

  async get(key: string): Promise<LoginRateLimitEntry | null> {
    return this.store.get(key) ?? null;
  }

  async set(key: string, value: LoginRateLimitEntry): Promise<void> {
    this.store.set(key, value);
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
}

const memoryStorage = new InMemoryLoginRateLimitStorage();

function getLoginRateLimitStorage(): LoginRateLimitStorage {
  // Fallback for local/dev mode. In production this should be replaced.
  return memoryStorage;
}

function parseClientIp(forwardedFor: string | null): string {
  if (!forwardedFor) return 'unknown-ip';
  return forwardedFor.split(',')[0]?.trim() || 'unknown-ip';
}

async function getRateLimitKey() {
  const requestHeaders = await headers();
  const ip = parseClientIp(requestHeaders.get('x-forwarded-for'));
  // MVP fingerprint from user-agent header. Can be replaced by stronger client fingerprint.
  const fingerprint = requestHeaders.get('user-agent') ?? 'unknown-agent';
  return `${ip}:${fingerprint}`;
}

async function isRateLimited(storage: LoginRateLimitStorage, key: string, now: number) {
  const entry = await storage.get(key);
  if (!entry) return false;

  if (entry.blockedUntil && entry.blockedUntil > now) {
    return true;
  }

  if (entry.blockedUntil && entry.blockedUntil <= now) {
    await storage.delete(key);
  }

  return false;
}

async function registerFailedAttempt(storage: LoginRateLimitStorage, key: string, now: number) {
  const entry = await storage.get(key);

  if (!entry || now - entry.firstAttemptAt > WINDOW_MS) {
    await storage.set(key, {
      attempts: 1,
      firstAttemptAt: now,
      blockedUntil: null,
    });
    return;
  }

  const nextAttempts = entry.attempts + 1;
  const shouldBlock = nextAttempts >= MAX_LOGIN_ATTEMPTS;

  await storage.set(key, {
    attempts: nextAttempts,
    firstAttemptAt: entry.firstAttemptAt,
    blockedUntil: shouldBlock ? now + LOCKOUT_MS : null,
  });
}

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;
  const now = Date.now();
  const storage = getLoginRateLimitStorage();
  const rateLimitKey = await getRateLimitKey();

  if (await isRateLimited(storage, rateLimitKey, now)) {
    return { error: SAFE_AUTH_ERROR_MESSAGE };
  }

  if (password === process.env.ADMIN_PASSWORD) {
    await storage.delete(rateLimitKey);
    const cookieStore = await cookies();
    const sessionToken = await createAdminSessionToken();

    cookieStore.set(adminAuth.ADMIN_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: adminAuth.ADMIN_SESSION_TTL_SECONDS,
      path: '/admin',
    });
    redirect('/admin');
  }

  await registerFailedAttempt(storage, rateLimitKey, now);
  return { error: SAFE_AUTH_ERROR_MESSAGE };
}
