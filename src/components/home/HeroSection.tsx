'use client';

import Link from 'next/link';
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
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(/images/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          filter: 'blur(2px)',
        }}
      />
      <div className="absolute inset-0 overflow-hidden">
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
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: 'var(--color-gold)',
            opacity: 0.3,
            top: '20%',
            left: '15%',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: 'var(--color-emerald)',
            opacity: 0.2,
            top: '60%',
            right: '20%',
            animation: 'float 6s ease-in-out infinite 1s',
          }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: 'var(--color-burgundy)',
            opacity: 0.25,
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
            border: '1px solid rgba(212,168,83,0.06)',
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
            border: '1px solid rgba(45,107,79,0.06)',
            borderRadius: '50%',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="container relative z-10 text-center"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8"
          style={{
            background: 'rgba(212,168,83,0.08)',
            border: '1px solid rgba(212,168,83,0.15)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
          }}
        >
          <span className="text-sm">✨</span>
          <span
            className="text-xs font-medium tracking-wider uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            Ручная работа из натурального камня
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
          style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-text)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
          }}
        >
          Оригинальные подарки
          <br />
          <span className="gradient-gold-text">из натурального камня</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
          style={{
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
          }}
        >
          Уникальные изделия для особых случаев. Каждый камень рассказывает свою историю.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s',
          }}
        >
          <Link href="/gift-picker" className="btn-primary text-base px-8 py-4">
            🎁 Подобрать подарок
          </Link>
          <Link href="/catalog" className="btn-secondary text-base px-8 py-4">
            Смотреть каталог →
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
