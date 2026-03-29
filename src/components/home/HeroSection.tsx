'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ background: 'var(--color-bg)' }}>
      {/* Dynamic Background Elements - strictly reduced */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-[60vw] h-[60vw] rounded-full blur-[120px]"
          style={{
            background: 'var(--color-primary)',
            opacity: 0.08,
            top: '-20%',
            right: '-10%',
            animation: 'pulseGold 8s infinite',
          }}
        />
        <div
          className="absolute w-[40vw] h-[40vw] rounded-full blur-[100px]"
          style={{
            background: 'var(--color-secondary)',
            opacity: 0.05,
            bottom: '-10%',
            left: '-10%',
          }}
        />
      </div>

      <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Typography & CTA */}
        <div
          className="flex flex-col items-start text-left max-w-xl"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Badge */}
          <div className="badge badge-primary mb-6 transition-all hover:scale-105 duration-300">
            <span className="mr-2">✨</span>
            Натуральные минералы
          </div>

          {/* Title */}
          <h1 className="mb-6" style={{
            fontSize: 'clamp(48px, 5vw, 64px)',
            color: 'var(--color-text-primary)'
          }}>
            Создаем подарки,<br />
            <span className="font-serif italic" style={{ color: 'var(--color-primary)' }}>наполненные смыслом</span>
          </h1>

          {/* Subtitle - exactly 120 chars max conceptually */}
          <p className="mb-8 text-reading" style={{
            fontSize: 'clamp(18px, 1.5vw, 22px)',
          }}>
            Уникальная текстура, мощная энергетика и безупречный стиль. Найдите камень, который станет вашим талисманом.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <Link href="/gift-picker" className="btn-primary w-full sm:w-auto">
              Подобрать за 30 секунд
            </Link>
            <Link href="/catalog" className="btn-secondary w-full sm:w-auto">
              В каталог →
            </Link>
          </div>

          {/* Social Proof Mini */}
          <div className="flex items-center gap-3 mt-10">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2" style={{ borderColor: 'var(--color-bg)', background: 'var(--color-surface)' }}>
                  <Image src={`/images/avatar-${i}.jpg`} alt={`Client ${i}`} width={32} height={32} className="rounded-full opacity-50" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                </div>
              ))}
            </div>
            <div className="text-small" style={{ color: 'var(--color-text-secondary)' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>2000+</strong> довольных клиентов
            </div>
          </div>
        </div>

        {/* Right Column: Visual / Illustration */}
        <div
          className="relative hidden lg:block h-full w-full min-h-[500px]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
          }}
        >
          {/* Main Showcase Image (Bento style graphic or clean product shot) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[24px] overflow-hidden"
                 style={{
                   border: '1px solid var(--color-border)',
                   boxShadow: 'var(--shadow-hover)'
                 }}>
              <Image
                src="/images/hero-bg.png"
                alt="Samocveti Craft"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ filter: 'brightness(0.9)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <div className="text-small uppercase tracking-widest mb-2" style={{ color: 'var(--color-primary)' }}>Новая коллекция</div>
                <h3 className="text-white text-2xl font-serif">Амазонит & Золото</h3>
              </div>
            </div>
            
            {/* Floating UI Element (SaaS vibe) */}
            <div className="absolute -left-12 top-1/4 card p-4 flex items-center gap-4 animate-[float_6s_ease-in-out_infinite]" style={{ background: 'var(--color-surface)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--color-secondary)' }}>
                    <span className="text-white">✓</span>
                </div>
                <div>
                   <div className="text-sm font-bold text-white">В наличии</div>
                   <div className="text-xs text-gray-400">Доставка завтра</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
