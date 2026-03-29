'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 no-underline">
              <span className="text-2xl">💎</span>
              <span className="text-xl font-bold tracking-wide font-serif" style={{ color: 'var(--color-primary)' }}>
                SAMOCVETI
              </span>
            </Link>
            <p className="text-small mb-6">
              Уникальные изделия ручной работы из натурального камня для особых случаев.
            </p>
            {/* Socials */}
            <div className="flex gap-4">
              {['ВК', 'TG', 'IG'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-md text-small font-medium transition-colors"
                  style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold mb-6 tracking-wider uppercase text-white">Навигация</h4>
            <ul className="flex flex-col gap-3 list-none">
              <li><Link href="/catalog" className="text-small hover:text-white transition-colors">Каталог</Link></li>
              <li><Link href="/gift-picker" className="text-small hover:text-white transition-colors">Подбор подарка</Link></li>
              <li><Link href="/about" className="text-small hover:text-white transition-colors">О нас</Link></li>
              <li><Link href="/delivery" className="text-small hover:text-white transition-colors">Доставка</Link></li>
            </ul>
          </div>

          {/* Catalog Categories */}
          <div>
            <h4 className="text-sm font-semibold mb-6 tracking-wider uppercase text-white">Категории</h4>
            <ul className="flex flex-col gap-3 list-none">
              <li><Link href="/catalog?category=paintings" className="text-small hover:text-white transition-colors">Картины</Link></li>
              <li><Link href="/catalog?category=jewelry" className="text-small hover:text-white transition-colors">Украшения</Link></li>
              <li><Link href="/catalog?category=souvenirs" className="text-small hover:text-white transition-colors">Сувениры</Link></li>
              <li><Link href="/catalog?category=interior" className="text-small hover:text-white transition-colors">Интерьер</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-sm font-semibold mb-6 tracking-wider uppercase text-white">Контакты</h4>
            <div className="flex flex-col gap-3">
              <p className="text-small">📍 Минск, ул. Немига, 12</p>
              <p className="text-small hover:text-white transition-colors cursor-pointer">📞 +375 (29) 123-45-67</p>
              <p className="text-small hover:text-white transition-colors cursor-pointer">✉️ info@samocveti.by</p>
              <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}>
                Пн–Пт: 10:00 – 19:00<br/>Сб: 11:00 – 17:00
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid var(--color-border)' }}>
          <p className="text-xs" style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}>
            © 2026 Samocveti. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs hover:text-white transition-colors" style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}>Политика конфиденциальности</Link>
            <Link href="/terms" className="text-xs hover:text-white transition-colors" style={{ color: 'var(--color-text-secondary)', opacity: 0.7 }}>Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
