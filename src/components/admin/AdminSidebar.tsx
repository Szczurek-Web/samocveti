'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navLinks = [
    { label: 'Товары', icon: '📦', href: '/admin' },
    { label: 'Категории', icon: '📂', href: '#', disabled: true },
    { label: 'Заказы', icon: '🧾', href: '#', disabled: true },
  ];

  return (
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
        {navLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          
          if (link.disabled) {
            return (
              <div
                key={link.label}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm cursor-default"
                style={{ color: '#525252' }}
              >
                <span className="text-base grayscale opacity-50">{link.icon}</span>
                {link.label}
                <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.05)' }}>soon</span>
              </div>
            );
          }

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`no-underline flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium admin-nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="text-base">{link.icon}</span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Link
          href="/"
          className="no-underline flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm admin-nav-link"
        >
          <span className="text-base">↩</span>
          На сайт
        </Link>
        <Link
          href="/admin/logout"
          className="no-underline flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-colors"
        >
          <span className="text-base">⏻</span>
          Выход
        </Link>
      </div>
    </aside>
  );
}
