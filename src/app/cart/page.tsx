'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center">
          <span className="text-4xl block mb-4">🛒</span>
          <p style={{ color: 'var(--color-text-secondary)' }}>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ background: 'var(--color-bg)' }}
      >
        <span className="text-6xl mb-6">🛒</span>
        <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
          Корзина пуста
        </h1>
        <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
          Добавьте товары из каталога или воспользуйтесь подбором подарка
        </p>
        <div className="flex gap-4">
          <Link href="/catalog" className="btn-primary px-8 py-3">
            Перейти в каталог
          </Link>
          <Link href="/gift-picker" className="btn-secondary px-8 py-3">
            Подобрать подарок
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-bold mb-10" style={{ fontFamily: 'var(--font-serif)' }}>
          Корзина
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 p-5 rounded-2xl"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
              >
                {/* Item Thumbnail */}
                <div
                  className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden relative"
                  style={{ background: 'var(--color-bg-hover)', border: '1px solid var(--color-border)' }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.id}`}
                    className="block no-underline text-sm font-medium mb-2 truncate"
                    style={{ color: 'var(--color-text)' }}
                  >
                    {item.name}
                  </Link>
                  <div className="text-lg font-bold mb-3" style={{ color: 'var(--color-gold)' }}>
                    {formatPrice(item.price)}
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-sm"
                        style={{
                          background: 'var(--color-bg-hover)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text)',
                          cursor: 'pointer',
                        }}
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-sm"
                        style={{
                          background: 'var(--color-bg-hover)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text)',
                          cursor: 'pointer',
                        }}
                      >
                        +
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs"
                      style={{
                        color: 'var(--color-text-muted)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm self-start"
              style={{
                color: 'var(--color-text-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Очистить корзину
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 p-6 rounded-2xl"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Итого
              </h3>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    Товары ({items.reduce((s, i) => s + i.quantity, 0)} шт)
                  </span>
                  <span>{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Доставка</span>
                  <span style={{ color: 'var(--color-emerald-light)' }}>Бесплатно</span>
                </div>
              </div>

              <div className="divider mb-6" />

              <div className="flex justify-between text-lg font-bold mb-8">
                <span>Итого</span>
                <span style={{ color: 'var(--color-gold)' }}>{formatPrice(getTotal())}</span>
              </div>

              <Link href="/checkout" className="btn-primary w-full text-center py-4 block">
                Оформить заказ
              </Link>

              <Link
                href="/catalog"
                className="block text-center text-sm mt-4 no-underline"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Продолжить покупки
              </Link>
            </div>
          </div>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}
