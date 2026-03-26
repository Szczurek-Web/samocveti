'use client';

import Link from 'next/link';
import { quickPicks } from '@/data/products';

export default function QuickPicks() {
  return (
    <section className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <h2 className="section-title">Подобрать по случаю</h2>
        <p className="section-subtitle">Не знаете, что выбрать? Мы поможем найти идеальный подарок</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickPicks.map((pick, i) => (
            <Link
              key={pick.id}
              href={`/gift-picker?preset=${pick.id}`}
              className="group relative flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl no-underline transition-all duration-300 text-center"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = pick.color;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${pick.color}20`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <span className="text-3xl md:text-4xl mb-3">{pick.icon}</span>
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--color-text)' }}
              >
                {pick.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
