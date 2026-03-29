import { cookies } from 'next/headers';
import crypto from 'crypto';

const SECRET = process.env.ADMIN_PASSWORD || 'fallback-secret-key';

export function signToken(payload: string): string {
  const signature = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return `${payload}:${signature}`;
}

export function verifyToken(token: string): boolean {
  const parts = token.split(':');
  if (parts.length < 2) return false;
  const payload = parts.slice(0, -1).join(':');
  const signature = parts[parts.length - 1];
  const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function guardAdminAction(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token || !verifyToken(token)) {
    throw new Error('Unauthorized');
  }
}
