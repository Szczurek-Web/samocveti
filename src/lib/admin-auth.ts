import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_SESSION_COOKIE = 'admin-token';
const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;
const ACCESS_DENIED_MESSAGE = 'Доступ запрещен';

type AdminSessionPayload = {
  role: 'admin';
  exp: number;
};

type RequireAdminSessionOptions = {
  onFail?: 'throw' | 'redirect';
  redirectTo?: string;
};

function getAdminSessionSecret() {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || '';
}

function base64UrlEncode(value: string) {
  return btoa(value)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(value: string) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  return atob(padded);
}

async function hmacSha256(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  const bytes = new Uint8Array(signature);
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function secureCompare(a: string, b: string) {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}

export async function createAdminSessionToken(now = Date.now()) {
  const secret = getAdminSessionSecret();
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not configured');
  }

  const payload: AdminSessionPayload = {
    role: 'admin',
    exp: Math.floor(now / 1000) + ADMIN_SESSION_TTL_SECONDS,
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await hmacSha256(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionToken(token: string | undefined | null, now = Date.now()) {
  if (!token) {
    return false;
  }

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) {
    return false;
  }

  const secret = getAdminSessionSecret();
  if (!secret) {
    return false;
  }

  const expectedSignature = await hmacSha256(encodedPayload, secret);
  if (!secureCompare(signature, expectedSignature)) {
    return false;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AdminSessionPayload;

    if (payload.role !== 'admin') {
      return false;
    }

    return payload.exp > Math.floor(now / 1000);
  } catch {
    return false;
  }
}

export async function requireAdminSession(options: RequireAdminSessionOptions = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  const isValid = await verifyAdminSessionToken(token);

  if (isValid) {
    return;
  }

  if (options.onFail === 'redirect') {
    redirect(options.redirectTo ?? '/admin/login');
  }

  throw new Error(ACCESS_DENIED_MESSAGE);
}

export const adminAuth = {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  ACCESS_DENIED_MESSAGE,
};
