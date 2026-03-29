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
    <section className="section bg-transparent id='how-it-works'">
      <div className="container">
        <h2 className="text-center mb-2">Почему выбирают нас</h2>
        <p className="text-center text-reading mx-auto mb-10">
          Мы создаём подарки, которые запоминаются на всю жизнь
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {usps.map((usp, i) => (
            <div
              key={usp.title}
              className="card text-center items-center"
              style={{
                animation: `fadeIn var(--transition-page) both`,
                animationDelay: `${i * 150}ms`,
              }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 relative"
                   style={{ background: 'rgba(212,168,83,0.1)' }}>
                <div className="absolute inset-0 rounded-full border border-[var(--color-primary)] opacity-30 animate-[pulseGold_2s_infinite] pointer-events-none"></div>
                {usp.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {usp.title}
              </h3>
              <p className="text-small">
                {usp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
