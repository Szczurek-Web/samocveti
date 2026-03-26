'use client';

import { useState } from 'react';

const stores = [
  {
    name: 'Магазин на Немиге',
    address: 'г. Минск, ул. Немига, 12',
    phone: '+375 (29) 123-45-67',
    hours: 'Пн–Пт: 10:00–19:00, Сб: 11:00–17:00',
    email: 'nemiga@samocveti.by',
  },
  {
    name: 'Магазин в ГУМе',
    address: 'г. Минск, пр. Независимости, 21',
    phone: '+375 (29) 765-43-21',
    hours: 'Пн–Вс: 10:00–21:00',
    email: 'gum@samocveti.by',
  },
];

export default function ContactsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  const inputStyle = {
    background: 'var(--color-bg-hover)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    outline: 'none',
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
          Контакты
        </h1>
        <p className="mb-12" style={{ color: 'var(--color-text-secondary)' }}>
          Мы всегда рады вашим вопросам и предложениям
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Stores */}
          <div className="flex flex-col gap-5">
            {stores.map((store) => (
              <div
                key={store.name}
                className="p-6 rounded-2xl transition-all duration-300"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold-dark)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                }}
              >
                <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>
                  {store.name}
                </h3>
                <div className="flex flex-col gap-3">
                  <p className="text-sm flex items-center gap-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>📍</span> {store.address}
                  </p>
                  <p className="text-sm flex items-center gap-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>📞</span>
                    <a href={`tel:${store.phone.replace(/[^+\d]/g, '')}`} className="no-underline" style={{ color: 'inherit' }}>
                      {store.phone}
                    </a>
                  </p>
                  <p className="text-sm flex items-center gap-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>✉️</span> {store.email}
                  </p>
                  <p className="text-sm flex items-center gap-3" style={{ color: 'var(--color-text-secondary)' }}>
                    <span>🕐</span> {store.hours}
                  </p>
                </div>
              </div>
            ))}

            {/* Messengers */}
            <div className="flex gap-3">
              <a
                href="https://wa.me/375291234567"
                className="btn-primary text-sm flex-1 text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp
              </a>
              <a
                href="https://t.me/samocveti"
                className="btn-secondary text-sm flex-1 text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                ✈️ Telegram
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div
            className="p-6 md:p-8 rounded-2xl"
            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
          >
            <h3 className="text-lg font-semibold mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Напишите нам
            </h3>
            {submitted ? (
              <div
                className="text-center py-10"
                style={{ animation: 'fadeIn 0.3s ease-out' }}
              >
                <span className="text-5xl block mb-4">✅</span>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  Спасибо! Мы ответим вам в ближайшее время.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>Имя *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={inputStyle}
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm"
                    style={inputStyle}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs mb-2" style={{ color: 'var(--color-text-secondary)' }}>Сообщение *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm resize-none"
                    style={{ ...inputStyle, minHeight: '120px' }}
                    placeholder="Ваше сообщение..."
                  />
                </div>
                <button type="submit" className="btn-primary py-3 mt-2">
                  Отправить
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map */}
        <div
          className="rounded-2xl overflow-hidden mb-16"
          style={{ border: '1px solid var(--color-border)' }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.4!2d27.554!3d53.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDU0JzAwLjAiTiAyN8KwMzMnMTQuNCJF!5e0!3m2!1sru!2sby!4v1"
            width="100%"
            height="400"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Samocveti на карте"
          />
        </div>

        <div className="h-10" />
      </div>
    </div>
  );
}
