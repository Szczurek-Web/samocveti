'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [delivery, setDelivery] = useState<'delivery' | 'pickup'>('delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
  });

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div
          className="max-w-md text-center p-10 rounded-2xl"
          style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            animation: 'slideUp 0.5s ease-out',
          }}
        >
          <span className="text-6xl block mb-6">✅</span>
          <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
            Заказ оформлен!
          </h1>
          <p className="mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            Спасибо за заказ! Мы свяжемся с вами в ближайшее время для подтверждения.
          </p>
          <Link href="/" className="btn-primary px-8 py-3">
            На главную
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <span className="text-5xl mb-4">🛒</span>
        <h1 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
          Корзина пуста
        </h1>
        <Link href="/catalog" className="btn-primary px-6 py-3 mt-4">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    // Simulate order processing (replace with real API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    clearCart();
    setIsSubmitting(false);
    setIsSubmitted(true);
  }, [isSubmitting, clearCart]);

  const inputStyle = {
    background: 'var(--color-bg-hover)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    outline: 'none',
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-bold mb-10" style={{ fontFamily: 'var(--font-serif)' }}>
          Оформление заказа
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/* Contact info */}
              <div
                className="p-6 rounded-2xl"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
              >
                <h3 className="text-sm font-semibold tracking-wider uppercase mb-6" style={{ color: 'var(--color-text)' }}>
                  Контактные данные
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                      ФИО *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={inputStyle}
                      placeholder="Иванов Иван Иванович"
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={inputStyle}
                      placeholder="+375 (29) 123-45-67"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={inputStyle}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div
                className="p-6 rounded-2xl"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
              >
                <h3 className="text-sm font-semibold tracking-wider uppercase mb-6" style={{ color: 'var(--color-text)' }}>
                  Способ получения
                </h3>
                <div className="flex gap-3 mb-4">
                  {(['delivery', 'pickup'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setDelivery(type)}
                      className="flex-1 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{
                        background: delivery === type ? 'rgba(212,168,83,0.1)' : 'var(--color-bg-hover)',
                        border: delivery === type ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                        color: delivery === type ? 'var(--color-gold)' : 'var(--color-text-secondary)',
                        cursor: 'pointer',
                      }}
                    >
                      {type === 'delivery' ? '🚚 Доставка' : '🏪 Самовывоз'}
                    </button>
                  ))}
                </div>
                {delivery === 'delivery' && (
                  <div>
                    <label className="block text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                      Адрес доставки *
                    </label>
                    <input
                      type="text"
                      required={delivery === 'delivery'}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl text-sm"
                      style={inputStyle}
                      placeholder="г. Минск, ул. Примерная, д. 1, кв. 1"
                    />
                  </div>
                )}
                {delivery === 'pickup' && (
                  <p className="text-sm px-4 py-3 rounded-xl" style={{ background: 'var(--color-bg-hover)', color: 'var(--color-text-secondary)' }}>
                    📍 г. Минск, ул. Немига, 12 — Пн–Пт: 10:00–19:00
                  </p>
                )}
              </div>

              {/* Comment */}
              <div
                className="p-6 rounded-2xl"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
              >
                <label className="block text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                  Комментарий к заказу
                </label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm resize-none"
                  style={{ ...inputStyle, minHeight: '100px' }}
                  placeholder="Пожелания к заказу, удобное время доставки и т.д."
                />
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div
                className="sticky top-24 p-6 rounded-2xl"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
              >
                <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                  Ваш заказ
                </h3>

                <div className="flex flex-col gap-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="truncate flex-1 mr-3" style={{ color: 'var(--color-text-secondary)' }}>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="divider mb-4" />

                <div className="flex justify-between text-sm mb-2">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Доставка</span>
                  <span style={{ color: 'var(--color-emerald-light)' }}>Бесплатно</span>
                </div>

                <div className="divider my-4" />

                <div className="flex justify-between text-lg font-bold mb-8">
                  <span>Итого</span>
                  <span style={{ color: 'var(--color-gold)' }}>{formatPrice(getTotal())}</span>
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full py-4 text-base"
                  disabled={isSubmitting}
                  style={{
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : undefined,
                  }}
                >
                  {isSubmitting ? '⏳ Оформляем заказ...' : 'Подтвердить заказ'}
                </button>

                <p className="text-[11px] text-center mt-4" style={{ color: 'var(--color-text-muted)' }}>
                  Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
                </p>
              </div>
            </div>
          </div>
        </form>

        <div className="h-20" />
      </div>
    </div>
  );
}
