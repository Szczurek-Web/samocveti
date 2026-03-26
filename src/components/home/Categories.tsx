'use client';

import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/products';

const categoryImages: Record<string, string> = {
  paintings: '/images/cat-paintings.png',
  clocks: '/images/cat-clocks.png',
  souvenirs: '/images/cat-souvenirs.png',
  jewelry: '/images/cat-jewelry.png',
  interior: '/images/cat-interior.png',
};

export default function Categories() {
  return (
    <section className="section" style={{ background: 'var(--color-bg-card)' }}>
      <div className="container">
        <h2 className="section-title">Категории</h2>
        <p className="section-subtitle">Выберите категорию изделий из натурального камня</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.slug}`}
              className="group relative flex flex-col items-center justify-end rounded-2xl no-underline overflow-hidden transition-all duration-300"
              style={{
                border: '1px solid var(--color-border)',
                height: '220px',
                animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold-dark)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
              }}
            >
              {/* Background image */}
              {categoryImages[cat.slug] ? (
                <Image
                  src={categoryImages[cat.slug]}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'var(--color-bg-elevated)' }}>
                  <span className="text-5xl md:text-6xl" style={{ opacity: 0.7 }}>{cat.icon}</span>
                </div>
              )}

              {/* Overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)',
                }}
              />

              {/* Label */}
              <div className="relative w-full px-4 py-4 text-center">
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
