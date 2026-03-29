'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/utils';
import { deleteProduct } from './actions';

interface ProductRow {
  id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice: number | null;
  images: string[];
  isNew: boolean;
  isPopular: boolean;
  category: { name: string } | null;
}

export default function AdminProductTable({ products }: { products: ProductRow[] }) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteProduct(id);
      showToast('Товар удалён');
    } catch {
      showToast('Ошибка удаления');
    }
    setDeletingId(null);
    setConfirmId(null);
  };

  return (
    <>
      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-2xl"
          style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-light)',
            color: 'var(--color-text)',
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          {toast}
        </div>
      )}

      {/* Card List / Enhanced Table */}
      <div className="flex flex-col gap-3">
        {/* Table Header Row (optional, but good for alignment) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 text-[11px] font-semibold tracking-wider uppercase" 
             style={{ color: 'var(--color-text-muted)', borderBottom: '1px solid var(--color-border)' }}>
          <div className="col-span-1">Фото</div>
          <div className="col-span-4">Наименование</div>
          <div className="col-span-2">Категория</div>
          <div className="col-span-2">Цена</div>
          <div className="col-span-2">Статус</div>
          <div className="col-span-1 text-right">Опции</div>
        </div>

        {/* Rows */}
        {products.map((p) => (
          <div
            key={p.id}
            className="group relative flex flex-col md:grid md:grid-cols-12 gap-4 items-center px-5 py-4 rounded-2xl transition-all duration-300"
            style={{ 
              background: 'var(--color-bg-card)', 
              border: '1px solid var(--color-border)'
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-hover)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-light)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 24px -10px rgba(0,0,0,0.8)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-card)';
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            {/* 1. Image */}
            <div className="col-span-1 w-full md:w-auto flex justify-start">
              <div className="w-14 h-14 rounded-xl overflow-hidden relative shadow-md" style={{ background: '#1a1a1e' }}>
                {p.images[0] ? (
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="56px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-600">No Img</div>
                )}
              </div>
            </div>

            {/* 2. Product Name & Slug */}
            <div className="col-span-4 w-full flex flex-col justify-center">
              <Link href={`/product/${p.slug}`} className="text-base font-bold truncate transition-colors hover:text-amber-500" style={{ color: 'var(--color-text)' }}>
                {p.name}
              </Link>
              <div className="text-xs font-mono mt-0.5 truncate" style={{ color: 'var(--color-text-muted)' }}>
                /{p.slug}
              </div>
            </div>

            {/* 3. Category */}
            <div className="col-span-2 w-full flex items-center">
              {p.category ? (
                <span className="text-xs font-medium px-2.5 py-1 rounded-md" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--color-text-secondary)' }}>
                  {p.category.name}
                </span>
              ) : (
                <span className="text-xs text-gray-600">—</span>
              )}
            </div>

            {/* 4. Price */}
            <div className="col-span-2 w-full flex flex-col justify-center">
              <span className="text-sm font-bold" style={{ color: 'var(--color-gold)' }}>{formatPrice(p.price)}</span>
              {p.oldPrice && (
                <span className="text-[10px] line-through opacity-60" style={{ color: 'var(--color-text-muted)' }}>
                  {formatPrice(p.oldPrice)}
                </span>
              )}
            </div>

            {/* 5. Status Badges */}
            <div className="col-span-2 w-full flex flex-wrap gap-2 items-center">
              {p.isPopular && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>
                  🔥 Hit
                </span>
              )}
              {p.isNew && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)' }}>
                  ✨ New
                </span>
              )}
              {!p.isPopular && !p.isNew && (
                <span className="text-[10px] text-gray-600">—</span>
              )}
            </div>

            {/* 6. Quick Actions (Hover visible on desktop) */}
            <div className="col-span-1 w-full flex justify-end items-center gap-2 mt-4 md:mt-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link
                href={`/product/${p.slug}`}
                target="_blank"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                title="Смотреть на сайте"
              >
                👁
              </Link>
              <Link
                href={`/admin/product/${p.slug}`}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-amber-500/10 text-amber-500"
                title="Изменить"
              >
                ✏️
              </Link>
              
              {confirmId === p.id ? (
                <div className="flex gap-1 bg-red-500/10 rounded-lg p-1">
                  <button
                    onClick={() => handleDelete(p.id)}
                    disabled={deletingId === p.id}
                    className="text-xs px-2 py-1 rounded text-red-400 hover:text-red-300"
                  >
                    Да
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    className="text-xs px-2 py-1 rounded text-red-400 hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmId(p.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/10 text-red-500"
                  title="Удалить"
                >
                  🗑
                </button>
              )}
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="py-16 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>
            <div className="text-4xl mb-4 opacity-50">📦</div>
            Здесь пока ничего нет. Добавьте свой первый товар!
          </div>
        )}
      </div>
    </>
  );
}
