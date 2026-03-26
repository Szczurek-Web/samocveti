'use client';


export default function AboutPage() {
  const values = [
    { icon: '🌍', title: 'Натуральность', desc: 'Используем только природные минералы, тщательно отобранные из лучших месторождений мира.' },
    { icon: '🤲', title: 'Мастерство', desc: 'Каждое изделие создано руками опытных мастеров-камнерезов с многолетним опытом.' },
    { icon: '✨', title: 'Уникальность', desc: 'Природный рисунок камня неповторим — каждый подарок единственный в своём роде.' },
    { icon: '💝', title: 'Забота', desc: 'Мы помогаем подобрать идеальный подарок, учитывая ваши пожелания и бюджет.' },
  ];

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            О <span className="gradient-gold-text">Samocveti</span>
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
            Мы — команда ценителей натурального камня. Уже более 10 лет мы создаём уникальные
            изделия и помогаем людям находить идеальные подарки для близких.
          </p>
        </div>

        {/* Story */}
        <div
          className="p-8 md:p-12 rounded-2xl mb-16"
          style={{
            background: 'var(--color-bg-card)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                Наша история
              </h2>
              <div className="flex flex-col gap-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                <p>
                  Samocveti родились из любви к камню. Всё началось с небольшой мастерской, где
                  первые изделия создавались с особым вниманием к каждой детали.
                </p>
                <p>
                  Сегодня мы — одни из ведущих магазинов изделий из натурального камня в Беларуси.
                  Два магазина в Минске, мастерская, сотни довольных клиентов.
                </p>
                <p>
                  Наша миссия — превратить выбор подарка в удовольствие. Мы верим, что подарок из
                  натурального камня — это не просто вещь, а история, энергия и эмоции.
                </p>
              </div>
            </div>
            <div
              className="h-[300px] rounded-2xl flex items-center justify-center"
              style={{ background: 'var(--color-bg-hover)' }}
            >
              <span className="text-8xl opacity-30">🏪</span>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="section-title">Наши ценности</h2>
          <p className="section-subtitle">Принципы, на которых строится наша работа</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <div
                key={val.title}
                className="p-8 rounded-2xl text-center transition-all duration-300"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  animation: `fadeIn 0.5s ease-out ${i * 0.1}s both`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold-dark)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                }}
              >
                <span className="text-4xl mb-4 block">{val.icon}</span>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  {val.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div
          className="p-8 md:p-12 rounded-2xl mb-16 text-center"
          style={{
            background: 'linear-gradient(135deg, var(--color-bg-card), var(--color-bg-elevated))',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10+', label: 'Лет на рынке' },
              { value: '500+', label: 'Изделий в каталоге' },
              { value: '2000+', label: 'Довольных клиентов' },
              { value: '15+', label: 'Видов камня' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="text-3xl md:text-4xl font-bold mb-2"
                  style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}
                >
                  {stat.value}
                </div>
                <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}
