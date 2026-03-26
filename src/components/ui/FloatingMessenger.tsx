'use client';

import { useState } from 'react';

export default function FloatingMessenger() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Expanded options */}
      {open && (
        <div
          className="flex flex-col gap-2 mb-2"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          <a
            href="https://wa.me/375291234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-2xl no-underline text-sm font-medium transition-all duration-200"
            style={{
              background: '#25D366',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
            }}
          >
            <span className="text-lg">💬</span>
            WhatsApp
          </a>
          <a
            href="https://t.me/samocveti"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-5 py-3 rounded-2xl no-underline text-sm font-medium transition-all duration-200"
            style={{
              background: '#229ED9',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(34,158,217,0.3)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
            }}
          >
            <span className="text-lg">✈️</span>
            Telegram
          </a>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 24px rgba(212,168,83,0.4)',
          transform: open ? 'rotate(45deg)' : 'rotate(0)',
          color: '#0a0a0a',
        }}
        title="Написать нам"
        aria-label="Messenger"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  );
}
