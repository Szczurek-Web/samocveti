'use client';

export default function USPSection() {
  const usps = [
    {
      icon: '💎',
      title: 'Натуральные камни',
      desc: 'Только природные минералы и самоцветы из проверенных месторождений',
    },
    {
      icon: '✋',
      title: 'Ручная работа',
      desc: 'Каждое изделие создано руками мастеров с многолетним опытом',
    },
    {
      icon: '🎨',
      title: 'Уникальные изделия',
      desc: 'Неповторимый рисунок камня — каждый подарок единственный в своём роде',
    },
    {
      icon: '🏪',
      title: 'Оффлайн-магазины',
      desc: 'Вы можете увидеть изделия вживую в наших магазинах в Минске',
    },
  ];

  return (
    <section className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <h2 className="section-title">Почему выбирают нас</h2>
        <p className="section-subtitle">
          Мы создаём подарки, которые запоминаются на всю жизнь
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((usp, i) => (
            <div
              key={usp.title}
              className="flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-300"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                animation: `fadeIn 0.5s ease-out ${i * 0.15}s both`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold-dark)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <span className="text-4xl mb-4">{usp.icon}</span>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-text)' }}
              >
                {usp.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {usp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
