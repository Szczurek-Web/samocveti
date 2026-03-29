import Link from 'next/link';
import { logoutAction } from './auth/actions';

export const metadata = {
  title: 'Admin Panel — Samocveti',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ background: '#09090b', minHeight: '100vh', color: '#fafafa' }}>
      <div className="flex">
        {/* Sidebar */}
        <aside
          className="hidden md:flex flex-col w-[240px] min-h-screen sticky top-0"
          style={{
            background: '#0c0c0f',
            borderRight: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Logo */}
          <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <Link href="/admin" className="no-underline flex items-center gap-2">
              <span style={{ color: '#d4a853', fontSize: '18px', fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
                ◆ Samocveti
              </span>
            </Link>
            <div className="text-[10px] mt-1 tracking-widest uppercase" style={{ color: '#525252' }}>
              Admin Panel
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
            <Link
              href="/admin"
              className="no-underline flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
              style={{ color: '#fafafa', background: 'rgba(212,168,83,0.08)' }}
            >
              <span className="text-base">📦</span>
              Товары
            </Link>
            <div
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-default"
              style={{ color: '#525252' }}
            >
              <span className="text-base">📂</span>
              Категории
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>soon</span>
            </div>
            <div
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-default"
              style={{ color: '#525252' }}
            >
              <span className="text-base">🧾</span>
              Заказы
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>soon</span>
            </div>
          </nav>

          {/* Bottom */}
          <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <Link
              href="/"
              className="no-underline flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
              style={{ color: '#71717a' }}
            >
              <span className="text-base">↩</span>
              На сайт
            </Link>
            <Link
              href="/admin/logout"
              className="no-underline flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors"
              style={{ color: '#ef4444' }}
            >
              <span className="text-base">⏻</span>
              Выход
            </Link>
          </div>
        </aside>

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
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/admin" className="hover:text-amber-500 transition">Товары</Link>
          <Link href="/" className="text-gray-400 hover:text-white transition">Вернуться на сайт →</Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-red-400 hover:text-red-300 transition"
            >
              Logout
            </button>
          </form>
        </nav>
      </header>
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
