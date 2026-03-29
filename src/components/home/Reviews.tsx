'use client';

import { useState } from 'react';
import { reviews } from '@/data/products';

export default function Reviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="section bg-transparent">
      <div className="container">
        <h2 className="text-center mb-2">Отзывы клиентов</h2>
        <p className="text-center text-reading mx-auto mb-10">Что говорят те, кто уже выбрал подарок у нас</p>

        <div className="max-w-4xl mx-auto">
          {/* Main review */}
          <div className="card text-center p-8 md:p-12 mb-8 animated-fadeIn" style={{ animation: 'fadeIn var(--transition-page) both' }}>
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, j) => (
                <span
                  key={j}
                  className="text-xl"
                  style={{
                    color: j < reviews[activeIndex].rating ? 'var(--color-primary)' : 'var(--color-border)',
                  }}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Quote */}
            <p className="text-xl md:text-2xl leading-relaxed mb-8 italic max-w-3xl mx-auto font-serif" style={{ color: 'var(--color-text-primary)' }}>
              &ldquo;{reviews[activeIndex].text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center justify-center gap-4">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(reviews[activeIndex].author)}&background=141414&color=ffffff&rounded=true`} 
                alt={reviews[activeIndex].author}
                className="w-12 h-12 rounded-full"
                style={{ border: '2px solid var(--color-border)' }}
              />
              <div className="text-left flex flex-col justify-center">
                <div className="font-semibold text-base" style={{ color: 'var(--color-text-primary)' }}>
                  {reviews[activeIndex].author}
                </div>
                {reviews[activeIndex].productName && (
                  <div className="text-xs mt-1" style={{ color: 'var(--color-primary)' }}>
                    {reviews[activeIndex].productName}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-4">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="w-2 h-2 p-0 rounded-full transition-all duration-300"
                style={{
                  background: i === activeIndex ? 'var(--color-primary)' : 'var(--color-border)',
                  cursor: 'pointer',
                  border: 'none',
                  transform: i === activeIndex ? 'scale(1.5)' : 'scale(1)',
                }}
                aria-label={`Отзыв ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
