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
    <section className="section bg-transparent">
      <div className="container">
        <h2 className="text-center mb-2">Категории</h2>
        <p className="text-center text-reading mx-auto mb-10">Выберите категорию изделий из натурального камня</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.slug}`}
              className="group relative flex flex-col items-center justify-end rounded-xl no-underline overflow-hidden transition-all duration-300 card-hover-fx"
              style={{
                border: '1px solid var(--color-border)',
                height: '240px',
                animation: `fadeIn var(--transition-page) both`,
                animationDelay: `${i * 100}ms`
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
                <div className="absolute inset-0 flex items-center justify-center bg-surface">
                  <span className="text-5xl opacity-50">{cat.icon}</span>
                </div>
              )}

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Label */}
              <div className="relative w-full px-4 py-4 text-center z-10">
                <span className="font-semibold text-white tracking-wide">
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
