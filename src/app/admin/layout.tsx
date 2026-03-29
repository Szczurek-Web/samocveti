import Link from 'next/link';
import { cookies } from 'next/headers';
import { verifyAdminSessionToken, adminAuth } from '@/lib/admin-auth';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Panel — Samocveti',
  robots: 'noindex, nofollow',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(adminAuth.ADMIN_SESSION_COOKIE)?.value;
  const isAuthenticated = await verifyAdminSessionToken(token);

  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center relative overflow-hidden" 
        style={{ background: '#09090b', color: '#fafafa' }}
      >
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% -20%, var(--color-gold), transparent 60%)',
          }}
        />
        <main className="w-full max-w-md relative z-10">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div style={{ background: '#09090b', minHeight: '100vh', color: '#fafafa' }}>
      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main */}
        <div className="flex-1 min-h-screen">
          {/* Mobile header */}
          <header
            className="md:hidden flex items-center justify-between px-4 py-3 sticky top-0 z-50"
            style={{
              background: 'rgba(9,9,11,0.9)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <Link href="/admin" className="no-underline" style={{ color: '#d4a853', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
              ◆ Samocveti
            </Link>
            <div className="flex gap-3">
              <Link href="/" className="text-xs no-underline" style={{ color: '#71717a' }}>← Сайт</Link>
              <Link href="/admin/logout" className="text-xs no-underline" style={{ color: '#ef4444' }}>Выход</Link>
            </div>
          </header>

          <main className="p-4 md:p-8 max-w-6xl">{children}</main>
        </div>
      </div>
    </div>
  );
}
