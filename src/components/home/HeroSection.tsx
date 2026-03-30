'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="Samocveti Hero Background"
          fill
          priority
          className="object-cover opacity-25 blur-[2px]"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(212,168,83,0.08) 0%, transparent 60%)',
          }}
        />
        {/* Decorative floating dots */}
        <div
          className="absolute w-2 h-2 rounded-full shadow-[0_0_10px_rgba(212,168,83,1)]"
          style={{
            background: 'var(--color-gold)',
            opacity: 0.5,
            top: '20%',
            left: '15%',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-3 h-3 rounded-full shadow-[0_0_15px_rgba(45,107,79,1)]"
          style={{
            background: 'var(--color-emerald)',
            opacity: 0.4,
            top: '60%',
            right: '20%',
            animation: 'float 6s ease-in-out infinite 1s',
          }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(139,34,82,1)]"
          style={{
            background: 'var(--color-burgundy)',
            opacity: 0.45,
            bottom: '30%',
            left: '25%',
            animation: 'float 7s ease-in-out infinite 2s',
          }}
        />
        {/* Subtle geometric lines */}
        <div
          className="absolute"
          style={{
            top: '10%',
            right: '10%',
            width: '300px',
            height: '300px',
            border: '1px solid rgba(212,168,83,0.1)',
            borderRadius: '50%',
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '15%',
            left: '5%',
            width: '200px',
            height: '200px',
            border: '1px solid rgba(45,107,79,0.1)',
            borderRadius: '50%',
          }}
        />

        {/* Extra decorative glowing orbs for luxury feel */}
        <div
          className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
          style={{
            background: 'var(--color-gold)',
            opacity: 0.15,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'pulseGold 4s infinite',
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full blur-[80px]"
          style={{
            background: 'var(--color-emerald)',
            opacity: 0.1,
            bottom: '-10%',
            right: '-5%',
            animation: 'pulseGold 6s infinite reverse',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="container relative z-10 text-center flex flex-col items-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full mb-8 backdrop-blur-sm"
          style={{
            background: 'rgba(212,168,83,0.1)',
            border: '1px solid rgba(212,168,83,0.2)',
            boxShadow: '0 0 20px rgba(212,168,83,0.2)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
          }}
        >
          <span className="text-sm">✨</span>
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            Ручная работа · Натуральные минералы
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold mb-6 leading-[1.1] max-w-5xl"
          style={{
            fontFamily: 'var(--font-serif)',
            color: '#ffffff',
            textShadow: '0 4px 24px rgba(0,0,0,0.5)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
          }}
        >
          Создаем подарки,
          <br />
          <span className="gradient-gold-text text-glow-gold italic px-2">наполненные смыслом</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium"
          style={{
            color: '#a1a1aa',
            lineHeight: 1.6,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
          }}
        >
          Уникальная текстура, мощная энергетика и безупречный стиль. <br className="hidden md:block"/> Найдите камень, который станет вашим талисманом.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-5 w-full justify-center max-w-md mx-auto sm:max-w-none"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
          }}
        >
          <Link href="/gift-picker" className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-black font-bold text-lg transition-transform hover:scale-105"
                style={{ background: 'linear-gradient(135deg, var(--color-gold-light), var(--color-gold-dark))', boxShadow: '0 10px 30px -10px rgba(212,168,83,0.8)' }}>
            🎁 Подобрать магию
          </Link>
          <Link href="/catalog" className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all border group"
                style={{ borderColor: 'rgba(212,168,83,0.3)', color: 'var(--color-gold)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(212,168,83,0.1)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
            В каталог <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        {/* Decision shortcut */}
        <div
          className="mt-6 text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s',
          }}
        >
          <Link
            href="/gift-picker"
            className="inline-flex items-center gap-2 text-sm no-underline transition-all duration-300"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--color-text-muted)'; }}
          >
            <span style={{ fontSize: '10px' }}>💡</span>
            Не знаете, что подарить? Подберём за 30 секунд →
          </Link>
        </div>

        {/* Stats */}
        <div
          className="flex justify-center gap-8 md:gap-16 mt-16"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.7s',
          }}
        >
          {[
            { value: '500+', label: 'Изделий' },
            { value: '15+', label: 'Видов камня' },
            { value: '2000+', label: 'Довольных клиентов' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}
              >
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{
          animation: 'float 3s ease-in-out infinite',
          opacity: isVisible ? 0.5 : 0,
          transition: 'opacity 1s ease 1s',
        }}
      >
        <div
          className="w-6 h-10 rounded-full flex justify-center pt-2"
          style={{ border: '1.5px solid var(--color-text-muted)' }}
        >
          <div
            className="w-1 h-2.5 rounded-full"
            style={{
              background: 'var(--color-gold)',
              animation: 'slideUp 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  );
}
