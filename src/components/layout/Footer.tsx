'use client';

import Link from 'next/link';

const footerLinks = {
  catalog: [
    { href: '/catalog?category=paintings', label: 'Картины' },
    { href: '/catalog?category=clocks', label: 'Часы' },
    { href: '/catalog?category=souvenirs', label: 'Сувениры' },
    { href: '/catalog?category=jewelry', label: 'Украшения' },
    { href: '/catalog?category=interior', label: 'Интерьер' },
  ],
  info: [
    { href: '/about', label: 'О нас' },
    { href: '/blog', label: 'Блог' },
    { href: '/delivery', label: 'Доставка и оплата' },
    { href: '/contacts', label: 'Контакты' },
    { href: '/gift-picker', label: 'Подбор подарка' },
    { href: '/favorites', label: 'Избранное' },
  ],
};

export default function Footer() {
  return (
    <footer
      style={{ background: 'var(--color-bg-card)', borderTop: '1px solid var(--color-border)' }}
    >
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 no-underline mb-4">
              <span className="text-2xl">💎</span>
              <span
                className="text-xl font-semibold tracking-wide"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}
              >
                SAMOCVETI
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Оригинальные подарки из натурального камня. Уникальные изделия ручной работы для
              особых случаев.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {['WhatsApp', 'Telegram', 'Instagram'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)';
                  }}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Catalog links */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 tracking-wider uppercase"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}
            >
              Каталог
            </h4>
            <ul className="flex flex-col gap-2.5" style={{ listStyle: 'none', padding: 0 }}>
              {footerLinks.catalog.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm no-underline transition-colors duration-200"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 tracking-wider uppercase"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}
            >
              Информация
            </h4>
            <ul className="flex flex-col gap-2.5" style={{ listStyle: 'none', padding: 0 }}>
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm no-underline transition-colors duration-200"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-gold)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 tracking-wider uppercase"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-sans)' }}
            >
              Контакты
            </h4>
            <div className="flex flex-col gap-3">
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                📍 г. Минск, ул. Немига, 12
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                📞{' '}
                <a
                  href="tel:+375291234567"
                  className="no-underline transition-colors duration-200"
                  style={{ color: 'var(--color-text-secondary)' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-gold)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-text-secondary)')}
                >
                  +375 (29) 123-45-67
                </a>
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                ✉️ info@samocveti.by
              </p>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Пн–Пт: 10:00 – 19:00
                <br />
                Сб: 11:00 – 17:00
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            © 2025 Samocveti. Все права защищены.
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Политика конфиденциальности
          </p>
        </div>
      </div>
    </footer>
  );
}
