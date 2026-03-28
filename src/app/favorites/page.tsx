'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';
import { useFavoritesStore } from '@/store/favoritesStore';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavoritesStore();
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>Загрузка...</p>
      </div>
    );
  }

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
          Избранное
        </h1>
        <p className="mb-10" style={{ color: 'var(--color-text-secondary)' }}>
          {favoriteProducts.length > 0
            ? `${favoriteProducts.length} ${favoriteProducts.length === 1 ? 'товар' : favoriteProducts.length < 5 ? 'товара' : 'товаров'}`
            : 'Здесь пока пусто'}
        </p>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <Link href={`/product/${product.slug}`} className="block no-underline">
                  <div
                    className="relative h-[200px] flex items-center justify-center overflow-hidden group"
                    style={{ background: 'var(--color-bg-hover)' }}
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{
                        backgroundImage: `url(${product.images[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />

                    {/* Remove from favorites */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite(product.id);
                        addToast('Удалено из избранного');
                      }}
                      className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
                      style={{
                        background: 'rgba(10,10,10,0.6)',
                        backdropFilter: 'blur(8px)',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#ef4444',
                        fontSize: '16px',
                      }}
                    >
                      ♥
                    </button>
                  </div>
                </Link>

                <div className="p-5">
                  <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
                    {product.stone.name}
                  </div>
                  <Link
                    href={`/product/${product.slug}`}
                    className="block no-underline text-sm font-medium mb-3"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {product.name}
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold" style={{ color: 'var(--color-gold)' }}>
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => {
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.images[0],
                        });
                        addToast('Добавлено в корзину');
                      }}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-20 rounded-2xl mb-16"
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            <span className="text-6xl mb-4">♡</span>
            <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
              Нет избранных товаров
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              Нажмите ♡ на карточке товара, чтобы добавить в избранное
            </p>
            <Link href="/catalog" className="btn-primary px-8 py-3">
              Перейти в каталог
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
