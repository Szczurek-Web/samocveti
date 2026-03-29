import Link from 'next/link';

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
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      <header
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="font-bold text-xl" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>
          Samocveti Admin
        </div>
        <nav className="flex gap-4 text-sm">
          <Link href="/admin" className="hover:text-amber-500 transition">Товары</Link>
          <Link href="/" className="text-gray-400 hover:text-white transition">Вернуться на сайт →</Link>
        </nav>
      </header>
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
