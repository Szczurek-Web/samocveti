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
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg text-sm font-medium"
          style={{
            background: '#18181b',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fafafa',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          {toast}
        </div>
      )}

      <div className="rounded-xl overflow-hidden" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)' }}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <th className="px-4 py-3 text-[11px] uppercase tracking-wider font-medium" style={{ color: '#52525b' }}>Товар</th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-wider font-medium hidden md:table-cell" style={{ color: '#52525b' }}>Категория</th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-wider font-medium" style={{ color: '#52525b' }}>Цена</th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-wider font-medium hidden sm:table-cell" style={{ color: '#52525b' }}>Статус</th>
              <th className="px-4 py-3 text-[11px] uppercase tracking-wider font-medium text-right" style={{ color: '#52525b' }}>Действия</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="transition-colors"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Product */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 relative" style={{ background: '#1a1a1e' }}>
                      {p.images[0] && (
                        <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="40px" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: '#fafafa' }}>{p.name}</div>
                      <div className="text-[11px] truncate" style={{ color: '#52525b' }}>{p.slug}</div>
                    </div>
                  </div>
                </td>
                {/* Category */}
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.05)', color: '#a1a1aa' }}>
                    {p.category?.name || '—'}
                  </span>
                </td>
                {/* Price */}
                <td className="px-4 py-3">
                  <span className="text-sm font-medium" style={{ color: '#d4a853' }}>{formatPrice(p.price)}</span>
                  {p.oldPrice && (
                    <span className="text-[11px] ml-1.5 line-through" style={{ color: '#52525b' }}>{formatPrice(p.oldPrice)}</span>
                  )}
                </td>
                {/* Status */}
                <td className="px-4 py-3 hidden sm:table-cell">
                  <div className="flex gap-1.5">
                    {p.isPopular && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171' }}>🔥 Хит</span>
                    )}
                    {p.isNew && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(59,130,246,0.1)', color: '#60a5fa' }}>✨ New</span>
                    )}
                    {!p.isPopular && !p.isNew && (
                      <span className="text-[10px]" style={{ color: '#3f3f46' }}>—</span>
                    )}
                  </div>
                </td>
                {/* Actions */}
                <td className="px-4 py-3 text-right">
                  <div className="flex gap-2 justify-end">
                    <Link
                      href={`/admin/product/${p.slug}`}
                      className="no-underline text-xs px-3 py-1.5 rounded-md transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', color: '#a1a1aa' }}
                    >
                      ✏️ Изменить
                    </Link>
                    {confirmId === p.id ? (
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deletingId === p.id}
                          className="text-xs px-3 py-1.5 rounded-md border-none cursor-pointer transition-colors"
                          style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', opacity: deletingId === p.id ? 0.5 : 1 }}
                        >
                          {deletingId === p.id ? '...' : 'Да'}
                        </button>
                        <button
                          onClick={() => setConfirmId(null)}
                          className="text-xs px-2 py-1.5 rounded-md border-none cursor-pointer"
                          style={{ background: 'rgba(255,255,255,0.05)', color: '#71717a' }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmId(p.id)}
                        className="text-xs px-3 py-1.5 rounded-md border-none cursor-pointer transition-colors"
                        style={{ background: 'rgba(239,68,68,0.06)', color: '#71717a' }}
                      >
                        🗑
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-sm" style={{ color: '#3f3f46' }}>
                  Товаров нет. Добавьте первый!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
