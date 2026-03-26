'use client';

import { Suspense } from 'react';
import CatalogContent from './CatalogContent';

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: 'var(--color-bg)' }}
        >
          <div className="text-center">
            <span className="text-4xl block mb-4">💎</span>
            <p style={{ color: 'var(--color-text-secondary)' }}>Загрузка каталога...</p>
          </div>
        </div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
