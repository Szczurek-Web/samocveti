const ADMIN_SESSION_COOKIE_NAME = 'admin-token';
const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours
const ADMIN_SESSION_ALG = 'HS256';

type AdminSessionPayload = {
  sub: 'admin';
  iat: number;
  exp: number;
};

function toBase64Url(input: string | Uint8Array): string {
  const bytes =
    typeof input === 'string' ? new TextEncoder().encode(input) : input;

  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function fromBase64Url(input: string): Uint8Array {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

async function importHmacKey(secret: string) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

export async function createAdminSessionToken(secret: string): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    sub: 'admin',
    iat,
    exp: iat + ADMIN_SESSION_MAX_AGE_SECONDS,
  };

  const header = { alg: ADMIN_SESSION_ALG, typ: 'JWT' };

  const encodedHeader = toBase64Url(JSON.stringify(header));
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;

  const key = await importHmacKey(secret);
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(unsignedToken),
  );

  const signature = toBase64Url(new Uint8Array(signatureBuffer));

  return `${unsignedToken}.${signature}`;
}

export async function verifyAdminSessionToken(
  token: string,
  secret: string,
): Promise<boolean> {
  const [encodedHeader, encodedPayload, signature] = token.split('.');

  if (!encodedHeader || !encodedPayload || !signature) {
    return false;
  }

  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const key = await importHmacKey(secret);

  const isSignatureValid = await crypto.subtle.verify(
    'HMAC',
    key,
    fromBase64Url(signature),
    new TextEncoder().encode(unsignedToken),
  );

  if (!isSignatureValid) {
    return false;
  }

  let payload: AdminSessionPayload;
  try {
    const payloadJson = new TextDecoder().decode(fromBase64Url(encodedPayload));
    payload = JSON.parse(payloadJson) as AdminSessionPayload;
  } catch {
    return false;
  }

  const now = Math.floor(Date.now() / 1000);

  return payload.sub === 'admin' && typeof payload.exp === 'number' && payload.exp > now;
}

export {
  ADMIN_SESSION_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SECONDS,
};
