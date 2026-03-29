'use client';

export default function ContactsSection() {
  return (
    <section className="section" style={{ background: 'var(--color-bg-card)' }}>
      <div className="container">
        <h2 className="section-title">Наши магазины</h2>
        <p className="section-subtitle">Приходите посмотреть изделия вживую</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="flex flex-col gap-6">
            {/* Main store */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}
              >
                Магазин на Немиге
              </h3>
              <div className="flex flex-col gap-3">
                <p className="text-sm flex items-center gap-3" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>📍</span> г. Минск, ул. Немига, 12
                </p>
                <p className="text-sm flex items-center gap-3" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>📞</span>
                  <a href="tel:+375291234567" className="no-underline" style={{ color: 'inherit' }}>
                    +375 (29) 123-45-67
                  </a>
                </p>
                <p className="text-sm flex items-center gap-3" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>🕐</span> Пн–Пт: 10:00–19:00, Сб: 11:00–17:00
                </p>
              </div>
            </div>

            {/* Second store */}
            <div
              className="p-6 rounded-2xl"
              style={{
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}
              >
                Магазин в ГУМе
              </h3>
              <div className="flex flex-col gap-3">
                <p className="text-sm flex items-center gap-3" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>📍</span> г. Минск, пр. Независимости, 21
                </p>
                <p className="text-sm flex items-center gap-3" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>📞</span>
                  <a href="tel:+375297654321" className="no-underline" style={{ color: 'inherit' }}>
                    +375 (29) 765-43-21
                  </a>
                </p>
                <p className="text-sm flex items-center gap-3" style={{ color: 'var(--color-text-secondary)' }}>
                  <span>🕐</span> Пн–Вс: 10:00–21:00
                </p>
              </div>
            </div>

            {/* Quick actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/375291234567"
                className="btn-primary text-sm flex-1 text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 Написать в WhatsApp
              </a>
              <a
                href="https://t.me/samocveti"
                className="btn-secondary text-sm flex-1 text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                ✈️ Написать в Telegram
              </a>
            </div>
          </div>

          {/* Map */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: '1px solid var(--color-border)',
              minHeight: '400px',
              background: 'var(--color-bg-elevated)',
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2350.4!2d27.554!3d53.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDU0JzAwLjAiTiAyN8KwMzMnMTQuNCJF!5e0!3m2!1sru!2sby!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px', filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Samocveti на карте"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
