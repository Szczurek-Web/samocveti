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
    <section className="section bg-transparent">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="mb-2">Популярные товары</h2>
            <p className="text-reading">Изделия, которые выбирают чаще всего</p>
          </div>
          <Link href="/catalog" className="btn-secondary hidden md:inline-flex">
            Все товары →
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="card flex-shrink-0 w-[300px] snap-center"
              style={{
                animation: `fadeIn var(--transition-page) both`,
                animationDelay: `${i * 100}ms`
              }}
            >
              {/* Image area */}
              <Link href={`/product/${product.slug}`} className="block relative h-[240px] card-img group">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                
                {/* Labels */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                  {product.isNew && <span className="badge badge-primary">Новинка</span>}
                  {product.oldPrice && (
                    <span className="badge badge-success">
                      -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                    </span>
                  )}
                </div>
                
                {/* Rating */}
                <div className="absolute bottom-3 right-3 badge bg-black/70 backdrop-blur-md text-white z-10">
                  <span style={{ color: 'var(--color-primary)' }} className="mr-1">★</span> {product.rating}
                </div>
              </Link>

              {/* Info Area */}
              <div className="flex flex-col flex-1 mt-1">
                <div className="text-small mb-1">{product.stone.name}</div>
                <Link
                  href={`/product/${product.slug}`}
                  className="card-title hover:text-white transition-colors mb-4 line-clamp-2 min-h-[58px]"
                  style={{ fontSize: '18px' }}
                >
                  {product.name}
                </Link>
                
                <div className="flex items-center justify-between mt-auto pt-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>
                      {formatPrice(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs line-through" style={{ color: 'var(--color-text-secondary)' }}>
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
                    className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors cursor-pointer"
                    style={{ background: 'var(--color-primary)', color: 'var(--color-bg)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-primary-dark)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-primary)'; }}
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
          <Link href="/catalog" className="btn-secondary w-full">
            Все товары →
          </Link>
        </div>
      </div>
    </section>
  );
}
