'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';

const navLinks = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/#how-it-works', label: 'Как работает' },
  { href: '/contacts', label: 'Контакты' },
];

export default function Header() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());
  const favCount = useFavoritesStore((s) => s.favorites.length);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isAdmin) return null;

  return (
    <header className="sticky-header py-4">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="text-2xl">💎</span>
          <span className="text-xl font-bold tracking-wide font-serif" style={{ color: 'var(--color-primary)' }}>
            SAMOCVETI
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-white transition-colors" style={{ color: 'var(--color-text-secondary)' }}>
            Главная
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-white transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions & CTA */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3">
            {/* Favorites */}
            <Link
              href="/favorites"
              className="relative flex items-center justify-center w-10 h-10 rounded-md transition-colors"
              style={{ background: 'var(--color-surface)' }}
              title="Избранное"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              {mounted && favCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full" style={{ background: 'var(--color-error)', color: '#fff' }}>
                  {favCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-md transition-colors"
              style={{ background: 'var(--color-surface)' }}
              title="Корзина"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {mounted && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded-full" style={{ background: 'var(--color-primary)', color: '#000' }}>
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          <Link href="/gift-picker" className="btn-primary hidden md:inline-flex">
            Подобрать подарок
          </Link>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Меню"
            style={{ background: 'transparent', border: 'none' }}
          >
            <span className="block w-6 h-0.5 transition-transform" style={{ background: 'var(--color-text-primary)' }} />
            <span className="block w-6 h-0.5 transition-opacity" style={{ background: 'var(--color-text-primary)' }} />
            <span className="block w-6 h-0.5 transition-transform" style={{ background: 'var(--color-text-primary)' }} />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 p-4 border-t" style={{ background: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <nav className="flex flex-col gap-2">
            <Link href="/" className="p-3 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Главная</Link>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="p-3 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/favorites" className="p-3 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Избранное {mounted && favCount > 0 && `(${favCount})`}
            </Link>
            <Link href="/cart" className="p-3 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              Корзина {mounted && itemCount > 0 && `(${itemCount})`}
            </Link>
            <Link href="/gift-picker" className="btn-primary w-full mt-4 justify-center" onClick={() => setIsMobileMenuOpen(false)}>
              Подобрать подарок
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
