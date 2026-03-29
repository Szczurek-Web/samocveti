'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  ADMIN_SESSION_COOKIE_NAME,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createAdminSessionToken,
} from '@/lib/admin-session';

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;

  if (password === process.env.ADMIN_PASSWORD) {
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!secret) {
      return { error: 'Сервис авторизации временно недоступен' };
    }

    const token = await createAdminSessionToken(secret);
    const cookieStore = await cookies();

    cookieStore.set(ADMIN_SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
      path: '/admin',
    });

    redirect('/admin');
  }

  return { error: 'Неверный пароль' };
}
