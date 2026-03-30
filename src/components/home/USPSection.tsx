'use client';

export default function USPSection() {
  const usps = [
    {
      icon: '🛡️',
      title: 'Гарантия качества',
      desc: 'Мы ручаемся за долговечность сборки и подлинность каждого минерала',
    },
    {
      icon: '🚚',
      title: 'Быстрая доставка',
      desc: 'Бережно и оперативно доставим ваш заказ в любую точку',
    },
    {
      icon: '✋',
      title: 'Ручная работа',
      desc: 'Каждое изделие создается мастером индивидуально, с душой и вниманием',
    },
    {
      icon: '💎',
      title: 'Натуральные камни',
      desc: 'Используем только настоящие природные самоцветы с сильной энергетикой',
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
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-6 relative group-hover:scale-110 transition-transform duration-500"
                   style={{ background: 'rgba(212,168,83,0.1)', boxShadow: '0 0 20px rgba(212,168,83,0.2)' }}>
                <div className="absolute inset-0 rounded-full border border-[var(--color-gold)] opacity-30 animate-pulse-gold pointer-events-none"></div>
                {usp.icon}
              </div>
              <h3
                className="text-xl font-bold mb-3"
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
