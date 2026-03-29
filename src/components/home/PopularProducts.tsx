'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/data/products';

interface PopularProductsProps {
  products: Product[];
}

export default function PopularProducts({ products }: PopularProductsProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <section className="section" style={{ background: 'var(--color-bg-card)' }}>
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Популярные товары
            </h2>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Изделия, которые выбирают чаще всего
            </p>
          </div>
          <Link
            href="/catalog"
            className="hidden md:inline-flex btn-secondary text-sm px-6 py-3"
          >
            Все товары →
          </Link>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 no-scrollbar">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[280px] rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-light)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
              }}
            >
              {/* Image area */}
              <Link href={`/product/${product.slug}`} className="block no-underline">
                <div
                  className="relative h-[220px] flex items-center justify-center overflow-hidden group"
                  style={{ background: 'var(--color-bg-hover)' }}
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300 pointer-events-none" />
                  {/* Labels */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && <span className="badge text-xs">Новинка</span>}
                    {product.oldPrice && (
                      <span className="badge-emerald badge text-xs">
                        -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  {/* Rating */}
                  <div
                    className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
                    style={{
                      background: 'rgba(10,10,10,0.7)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--color-gold)',
                    }}
                  >
                    ★ {product.rating}
                  </div>
                </div>
              </Link>

              {/* Info */}
              <div className="p-5">
                <div className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
                  {product.stone.name}
                </div>
                <Link
                  href={`/product/${product.slug}`}
                  className="block no-underline text-sm font-medium mb-3 leading-snug"
                  style={{ color: 'var(--color-text)' }}
                >
                  {product.name}
                </Link>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-lg font-bold"
                      style={{ color: 'var(--color-gold)' }}
                    >
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span
                        className="text-sm line-through"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      addItem({
                        id: product.id,
                        slug: product.slug,
                        name: product.name,
                        price: product.price,
                        image: product.images[0],
                      })
                    }
                    className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200"
                    style={{
                      background: 'rgba(212,168,83,0.1)',
                      border: '1px solid rgba(212,168,83,0.2)',
                      color: 'var(--color-gold)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'var(--color-gold)';
                      (e.currentTarget as HTMLElement).style.color = '#0a0a0a';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(212,168,83,0.1)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)';
                    }}
                    title="В корзину"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/catalog" className="btn-secondary text-sm px-6 py-3">
            Все товары →
          </Link>
        </div>
      </div>
    </section>
  );
}
