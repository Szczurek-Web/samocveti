'use client';

import Link from 'next/link';
import { quickPicks } from '@/data/products';

export default function QuickPicks() {
  return (
    <section className="section bg-transparent">
      <div className="container">
        <h2 className="text-center mb-2">Подобрать по случаю</h2>
        <p className="text-center text-reading mx-auto mb-10">Не знаете, что выбрать? Мы поможем найти идеальный подарок</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickPicks.map((pick, i) => (
            <Link
              key={pick.id}
              href={`/gift-picker?preset=${pick.id}`}
              className="card group flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:scale-105 no-underline"
              style={{
                animation: `fadeIn var(--transition-page) both`,
                animationDelay: `${i * 100}ms`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = pick.color || 'var(--color-primary)';
                e.currentTarget.style.boxShadow = `0 8px 30px ${pick.color || 'var(--color-primary)'}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
              }}
            >
              <span className="text-4xl mb-3">{pick.icon}</span>
              <span className="font-medium text-white tracking-wide">
                {pick.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
