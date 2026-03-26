'use client';

import { useState } from 'react';

const deliveryMethods = [
  { method: 'Курьер по Минску', time: '1–2 дня', price: 'Бесплатно от 100 BYN' },
  { method: 'Почта Беларуси', time: '3–5 дней', price: '5–10 BYN' },
  { method: 'Европочта', time: '2–3 дня', price: '7–12 BYN' },
  { method: 'Самовывоз', time: 'В тот же день', price: 'Бесплатно' },
];

const paymentMethods = [
  { method: 'Банковская карта', icon: '💳', desc: 'Visa, Mastercard' },
  { method: 'ЕРИП', icon: '🏦', desc: 'Система "Расчёт" (ЕРИП)' },
  { method: 'Наличные', icon: '💵', desc: 'При самовывозе или курьеру' },
  { method: 'Рассрочка', icon: '📊', desc: 'Рассрочка на 3 месяца' },
];

const faqItems = [
  {
    q: 'Сколько стоит доставка?',
    a: 'Доставка курьером по Минску бесплатна при заказе от 100 BYN. Доставка по Беларуси — от 5 до 12 BYN в зависимости от службы доставки.'
  },
  {
    q: 'Как упаковывается заказ?',
    a: 'Все изделия надёжно упаковываются в специальную коробку с мягким наполнителем. По вашему желанию — подарочная упаковка бесплатно.'
  },
  {
    q: 'Можно ли вернуть товар?',
    a: 'Да, возврат возможен в течение 14 дней с момента получения, если товар не носит следов использования и сохранена оригинальная упаковка.'
  },
  {
    q: 'Есть ли гарантия?',
    a: 'Гарантия на изделия — 12 месяцев. Гарантия распространяется на дефекты камня и фурнитуры.'
  },
  {
    q: 'Можно ли заказать индивидуальное изделие?',
    a: 'Да! Мы принимаем индивидуальные заказы. Свяжитесь с нами через WhatsApp или Telegram, и мы обсудим детали.'
  },
];

export default function DeliveryPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
          Доставка и оплата
        </h1>
        <p className="mb-12" style={{ color: 'var(--color-text-secondary)' }}>
          Всё, что нужно знать о получении вашего заказа
        </p>

        {/* Delivery */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>
            🚚 Способы доставки
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <table className="w-full" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--color-bg-elevated)' }}>
                  <th className="text-left text-xs font-semibold tracking-wider uppercase px-6 py-4" style={{ color: 'var(--color-text-secondary)' }}>Способ</th>
                  <th className="text-left text-xs font-semibold tracking-wider uppercase px-6 py-4" style={{ color: 'var(--color-text-secondary)' }}>Срок</th>
                  <th className="text-left text-xs font-semibold tracking-wider uppercase px-6 py-4" style={{ color: 'var(--color-text-secondary)' }}>Стоимость</th>
                </tr>
              </thead>
              <tbody>
                {deliveryMethods.map((d, i) => (
                  <tr key={d.method} style={{ background: i % 2 === 0 ? 'var(--color-bg-card)' : 'var(--color-bg-elevated)', borderTop: '1px solid var(--color-border)' }}>
                    <td className="px-6 py-4 text-sm font-medium" style={{ color: 'var(--color-text)' }}>{d.method}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>{d.time}</td>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--color-emerald-light)' }}>{d.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>
            💳 Способы оплаты
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentMethods.map((pm) => (
              <div
                key={pm.method}
                className="p-6 rounded-2xl text-center transition-all duration-300"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold-dark)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <span className="text-3xl block mb-3">{pm.icon}</span>
                <div className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{pm.method}</div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{pm.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>
            ❓ Частые вопросы
          </h2>
          <div className="flex flex-col gap-3">
            {faqItems.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text)' }}
                >
                  <span className="text-sm font-medium pr-4">{faq.q}</span>
                  <span
                    className="text-lg flex-shrink-0 transition-transform duration-300"
                    style={{
                      color: 'var(--color-gold)',
                      transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div
                    className="px-6 pb-5"
                    style={{ animation: 'fadeIn 0.3s ease-out' }}
                  >
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}
