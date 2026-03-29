'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { signToken } from '@/lib/auth';

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;

  if (password === process.env.ADMIN_PASSWORD) {
    const payload = `admin:${Date.now()}`;
    const token = signToken(payload);
    
    const cookieStore = await cookies();
    cookieStore.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/admin',
      sameSite: 'lax',
    });
    redirect('/admin');
  }

  return { error: 'Неверный пароль' };
}
