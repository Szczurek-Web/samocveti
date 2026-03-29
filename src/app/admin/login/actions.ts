'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { adminAuth, createAdminSessionToken } from '@/lib/admin-auth';

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;

  if (password === process.env.ADMIN_PASSWORD) {
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

  return { error: 'Неверный пароль' };
}
