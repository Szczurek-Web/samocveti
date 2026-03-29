'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { createOrder, validatePromo } from './actions';

type Step = 1 | 2 | 3;
type DeliveryType = 'delivery' | 'pickup';
type PaymentMethod = 'cash' | 'card' | 'transfer';

const stepLabels = ['Данные', 'Доставка и оплата', 'Подтверждение'];

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [delivery, setDelivery] = useState<DeliveryType>('delivery');
  const [payment, setPayment] = useState<PaymentMethod>('card');
  const [giftWrap, setGiftWrap] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscountRate, setPromoDiscountRate] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [validatedPromoCode, setValidatedPromoCode] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
  });

  useEffect(() => setMounted(true), []);

  const giftWrapPrice = 10;
  const subtotal = getTotal();
  const promoDiscount = promoApplied ? Math.round(subtotal * promoDiscountRate) : 0;
  const total = subtotal + (giftWrap ? giftWrapPrice : 0) - promoDiscount;

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const result = await createOrder({
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, image: i.image })),
        total,
        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email || undefined,
        deliveryType: delivery,
        deliveryAddress: delivery === 'delivery' ? formData.address : undefined,
        paymentMethod: payment,
        giftWrap,
        comment: formData.comment || undefined,
        promoCode: validatedPromoCode || undefined,
        promoDiscount,
      });
      if (result.error) {
        setSubmitError(result.error);
        setIsSubmitting(false);
        return;
      }
      setOrderNumber('SC-' + result.orderNumber);
      clearCart();
      setIsSubmitted(true);
    } catch {
      setSubmitError('Ошибка оформления заказа');
    }
    setIsSubmitting(false);
  }, [isSubmitting, clearCart, items, total, formData, delivery, payment, giftWrap, validatedPromoCode, promoDiscount]);

  if (!mounted) return null;

  const handleApplyPromo = async () => {
    setPromoError('');
    const result = await validatePromo(promoCode);
    if (result.valid && result.discount) {
      setPromoApplied(true);
      setPromoDiscountRate(result.discount);
      setValidatedPromoCode(result.code || promoCode);
    } else {
      setPromoError(result.error || 'Неверный промокод');
    }
  };

  const canProceed = (): boolean => {
    if (step === 1) return formData.name.trim() !== '' && formData.phone.trim() !== '';
    if (step === 2) return delivery === 'pickup' || formData.address.trim() !== '';
    return true;
  };

  const goNext = () => {
    if (step < 3) setStep((step + 1) as Step);
  };

  const goBack = () => {
    if (step > 1) setStep((step - 1) as Step);
  };



  // ===== SUCCESS SCREEN =====
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <div
          className="max-w-lg w-full text-center p-10 md:p-14 rounded-2xl mx-4"
          style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
            animation: 'scaleIn 0.5s ease-out',
          }}
        >
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(45,107,79,0.15)', border: '2px solid var(--color-emerald-light)' }}
          >
            <span className="text-4xl">✓</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
            Заказ оформлен!
          </h1>
          <p className="mb-2 text-lg" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}>
            №{orderNumber}
          </p>
          <p className="mb-8" style={{ color: 'var(--color-text-secondary)' }}>
            Спасибо за заказ! Мы свяжемся с вами в ближайшее время для подтверждения и уточнения деталей доставки.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary px-8 py-3">
              На главную
            </Link>
            <Link href="/catalog" className="btn-secondary px-8 py-3">
              Продолжить покупки
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ===== EMPTY CART =====
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--color-bg)' }}>
        <span className="text-5xl mb-4">🛒</span>
        <h1 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
          Корзина пуста
        </h1>
        <p className="mb-6 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
          Добавьте товары из каталога, чтобы оформить заказ
        </p>
        <Link href="/catalog" className="btn-primary px-6 py-3">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  const inputStyle = {
    background: 'var(--color-bg-hover)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    outline: 'none',
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
          Оформление заказа
        </h1>

        {/* ===== STEPPER ===== */}
        <div className="stepper">
          {stepLabels.map((label, i) => {
            const stepNum = (i + 1) as Step;
            const isActive = step === stepNum;
            const isCompleted = step > stepNum;
            return (
              <div key={i} className="contents">
                <div className={`stepper-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                  <span className="stepper-step-number">
                    {isCompleted ? '✓' : stepNum}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div className={`stepper-line ${isCompleted ? 'completed' : isActive ? 'active' : ''}`} />
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ===== FORM AREA ===== */}
          <div className="lg:col-span-2 flex flex-col gap-6" style={{ animation: 'slideLeft 0.4s ease-out' }}>
            {/* STEP 1: Contact info */}
            {step === 1 && (
              <>
                <div
                  className="p-6 rounded-2xl"
                  style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                >
                  <h3 className="text-sm font-semibold tracking-wider uppercase mb-6" style={{ color: 'var(--color-text)' }}>
                    👤 Контактные данные
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

                <button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="btn-primary py-4 text-base self-end px-12"
                  style={{ opacity: canProceed() ? 1 : 0.5, cursor: canProceed() ? 'pointer' : 'not-allowed' }}
                >
                  Далее →
                </button>
              </>
            )}

            {/* STEP 2: Delivery + Payment */}
            {step === 2 && (
              <>
                {/* Delivery */}
                <div
                  className="p-6 rounded-2xl"
                  style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                >
                  <h3 className="text-sm font-semibold tracking-wider uppercase mb-6" style={{ color: 'var(--color-text)' }}>
                    🚚 Способ получения
                  </h3>
                  <div className="flex gap-3 mb-4">
                    {([
                      { type: 'delivery' as const, label: '🚚 Доставка курьером', sub: 'Бесплатно от 100 BYN' },
                      { type: 'pickup' as const, label: '🏪 Самовывоз', sub: 'г. Минск, ул. Немига, 12' },
                    ]).map(({ type, label, sub }) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setDelivery(type)}
                        className="flex-1 flex flex-col items-center gap-1 px-5 py-4 rounded-xl text-sm font-medium transition-all duration-200"
                        style={{
                          background: delivery === type ? 'rgba(212,168,83,0.08)' : 'var(--color-bg-hover)',
                          border: delivery === type ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                          color: delivery === type ? 'var(--color-gold)' : 'var(--color-text-secondary)',
                          cursor: 'pointer',
                        }}
                      >
                        <span>{label}</span>
                        <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{sub}</span>
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
                        required
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
                      📍 г. Минск, ул. Немига, 12 — Пн–Пт: 10:00–19:00, Сб: 10:00–16:00
                    </p>
                  )}
                </div>

                {/* Payment */}
                <div
                  className="p-6 rounded-2xl"
                  style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                >
                  <h3 className="text-sm font-semibold tracking-wider uppercase mb-6" style={{ color: 'var(--color-text)' }}>
                    💳 Способ оплаты
                  </h3>
                  <div className="flex flex-col gap-3">
                    {([
                      { method: 'card' as const, icon: '💳', label: 'Банковская карта', sub: 'Visa, Mastercard, Белкарт' },
                      { method: 'cash' as const, icon: '💵', label: 'Наличными', sub: 'При получении курьеру или в магазине' },
                      { method: 'transfer' as const, icon: '🏦', label: 'Банковский перевод', sub: 'По реквизитам (для юр. лиц)' },
                    ]).map(({ method, icon, label, sub }) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPayment(method)}
                        className={`payment-option ${payment === method ? 'selected' : ''}`}
                      >
                        <span className="payment-option-icon">{icon}</span>
                        <div className="flex flex-col text-left">
                          <span className="font-medium text-sm">{label}</span>
                          <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{sub}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gift wrapping */}
                <div
                  className="p-6 rounded-2xl"
                  style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                >
                  <h3 className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: 'var(--color-text)' }}>
                    🎁 Дополнительно
                  </h3>
                  <button
                    type="button"
                    onClick={() => setGiftWrap(!giftWrap)}
                    className={`gift-wrap-option w-full ${giftWrap ? 'selected' : ''}`}
                  >
                    <span className="text-2xl">🎀</span>
                    <div className="flex flex-col text-left flex-1">
                      <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                        Подарочная упаковка
                      </span>
                      <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                        Оригинальная упаковка с бантом и поздравительной карточкой
                      </span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: 'var(--color-gold)' }}>
                      +{formatPrice(giftWrapPrice)}
                    </span>
                  </button>
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
                    style={{ ...inputStyle, minHeight: '80px' }}
                    placeholder="Пожелания к заказу, удобное время доставки и т.д."
                  />
                </div>

                <div className="flex gap-3 justify-between">
                  <button
                    onClick={goBack}
                    className="btn-secondary py-3 px-8"
                  >
                    ← Назад
                  </button>
                  <button
                    onClick={goNext}
                    disabled={!canProceed()}
                    className="btn-primary py-3 px-12"
                    style={{ opacity: canProceed() ? 1 : 0.5, cursor: canProceed() ? 'pointer' : 'not-allowed' }}
                  >
                    Далее →
                  </button>
                </div>
              </>
            )}

            {/* STEP 3: Confirmation */}
            {step === 3 && (
              <>
                <div
                  className="p-6 rounded-2xl"
                  style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                >
                  <h3 className="text-sm font-semibold tracking-wider uppercase mb-6" style={{ color: 'var(--color-text)' }}>
                    📋 Проверьте данные
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Получатель</div>
                      <div className="text-sm font-medium">{formData.name}</div>
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Телефон</div>
                      <div className="text-sm font-medium">{formData.phone}</div>
                    </div>
                    {formData.email && (
                      <div>
                        <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Email</div>
                        <div className="text-sm font-medium">{formData.email}</div>
                      </div>
                    )}
                    <div>
                      <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Получение</div>
                      <div className="text-sm font-medium">
                        {delivery === 'delivery' ? `🚚 Доставка: ${formData.address}` : '🏪 Самовывоз: ул. Немига, 12'}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Оплата</div>
                      <div className="text-sm font-medium">
                        {payment === 'card' ? '💳 Банковская карта' : payment === 'cash' ? '💵 Наличными' : '🏦 Перевод'}
                      </div>
                    </div>
                    {giftWrap && (
                      <div>
                        <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Упаковка</div>
                        <div className="text-sm font-medium">🎀 Подарочная упаковка</div>
                      </div>
                    )}
                  </div>
                  {formData.comment && (
                    <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                      <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>Комментарий</div>
                      <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{formData.comment}</div>
                    </div>
                  )}
                </div>

                {/* Trust badges */}
                <div className="trust-badges">
                  <div className="trust-badge">
                    <span>🛡️</span> 100% гарантия качества
                  </div>
                  <div className="trust-badge">
                    <span>🔒</span> Безопасная оплата
                  </div>
                  <div className="trust-badge">
                    <span>📦</span> Бережная доставка
                  </div>
                </div>

                <div className="flex gap-3 justify-between">
                  <button onClick={goBack} className="btn-secondary py-3 px-8">
                    ← Назад
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="btn-primary py-4 px-12 text-base"
                    disabled={isSubmitting}
                    style={{
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : undefined,
                      animation: isSubmitting ? 'none' : 'pulseGold 2s infinite',
                    }}
                  >
                    {isSubmitting ? '⏳ Оформляем...' : '✓ Подтвердить заказ'}
                  </button>
                </div>

                <p className="text-[11px] text-center" style={{ color: 'var(--color-text-muted)' }}>
                  Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
                </p>
              </>
            )}
          </div>

          {/* ===== ORDER SUMMARY (sticky sidebar) ===== */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 p-6 rounded-2xl"
              style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            >
              <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Ваш заказ
              </h3>

              {/* Items with thumbnails */}
              <div className="flex flex-col gap-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div
                      className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden relative"
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
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate" style={{ color: 'var(--color-text-secondary)' }}>
                        {item.name}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        × {item.quantity}
                      </div>
                    </div>
                    <span className="flex-shrink-0 text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="divider mb-4" />

              {/* Promo code */}
              <div className="mb-4">
                {promoApplied ? (
                  <div className="flex items-center justify-between text-sm">
                    <span style={{ color: 'var(--color-emerald-light)' }}>✓ Промокод применён</span>
                    <span style={{ color: 'var(--color-emerald-light)' }}>−{formatPrice(promoDiscount)}</span>
                  </div>
                ) : (
                  <div>
                    <div className="promo-input-group">
                      <input
                        type="text"
                        placeholder="Промокод"
                        value={promoCode}
                        onChange={(e) => { setPromoCode(e.target.value); setPromoError(''); }}
                      />
                      <button onClick={handleApplyPromo}>Применить</button>
                    </div>
                    {promoError && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{promoError}</p>}
                  </div>
                )}
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Товары ({items.reduce((s, i) => s + i.quantity, 0)} шт)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-text-secondary)' }}>Доставка</span>
                  <span style={{ color: 'var(--color-emerald-light)' }}>Бесплатно</span>
                </div>
                {giftWrap && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--color-text-secondary)' }}>🎀 Упаковка</span>
                    <span>{formatPrice(giftWrapPrice)}</span>
                  </div>
                )}
                {promoApplied && (
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--color-emerald-light)' }}>Скидка</span>
                    <span style={{ color: 'var(--color-emerald-light)' }}>−{formatPrice(promoDiscount)}</span>
                  </div>
                )}
              </div>

              <div className="divider my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Итого</span>
                <span style={{ color: 'var(--color-gold)' }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}
