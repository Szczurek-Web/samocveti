'use client';

import { useState } from 'react';
import { reviews } from '@/data/products';

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <h2 className="section-title">Отзывы наших клиентов</h2>
        <p className="section-subtitle">Что говорят те, кто уже выбрал подарок у нас</p>

        <div className="max-w-4xl mx-auto">
          {/* Main review */}
          <div
            className="p-8 md:p-12 rounded-2xl mb-8 text-center"
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, j) => (
                <span
                  key={j}
                  className="text-xl"
                  style={{
                    color: j < reviews[activeIndex].rating ? 'var(--color-gold)' : 'var(--color-text-muted)',
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p
              className="text-lg md:text-xl leading-relaxed mb-8 italic"
              style={{ color: 'var(--color-text)', fontFamily: 'var(--font-serif)' }}
            >
              &ldquo;{reviews[activeIndex].text}&rdquo;
            </p>

            {/* Author */}
            <div>
              <div className="font-semibold" style={{ color: 'var(--color-text)' }}>
                {reviews[activeIndex].author}
              </div>
              {reviews[activeIndex].productName && (
                <div className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  {reviews[activeIndex].productName}
                </div>
              )}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  background: i === activeIndex ? 'var(--color-gold)' : 'var(--color-border-light)',
                  cursor: 'pointer',
                  border: 'none',
                  transform: i === activeIndex ? 'scale(1.3)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
