'use client';

import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useToastStore } from '@/store/toastStore';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const addToast = useToastStore((s) => s.addToast);
  const fav = isFavorite(product.id);

  return (
    <div
      className="group rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border-light)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
      }}
    >
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block no-underline">
        <div
          className="relative h-[240px] flex items-center justify-center overflow-hidden"
          style={{ background: 'var(--color-bg-hover)' }}
        >
          <span className="text-6xl opacity-30">💎</span>

          {/* Labels */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <span className="badge text-xs">Новинка</span>}
            {product.oldPrice && (
              <span className="badge-emerald badge text-xs">
                -{Math.round((1 - product.price / product.oldPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Favorite button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(product.id);
              addToast(fav ? 'Удалено из избранного' : 'Добавлено в избранное');
            }}
            className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              background: 'rgba(10,10,10,0.6)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              cursor: 'pointer',
              color: fav ? '#ef4444' : 'var(--color-text-muted)',
              fontSize: '16px',
            }}
          >
            {fav ? '♥' : '♡'}
          </button>

          {/* Rating */}
          <div
            className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs"
            style={{
              background: 'rgba(10,10,10,0.7)',
              backdropFilter: 'blur(8px)',
              color: 'var(--color-gold)',
            }}
          >
            ★ {product.rating}
            <span style={{ color: 'var(--color-text-muted)' }}>({product.reviewCount})</span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-5">
        <div className="text-xs mb-2" style={{ color: 'var(--color-text-muted)' }}>
          {product.stone.name}
        </div>
        <Link
          href={`/product/${product.id}`}
          className="block no-underline text-sm font-medium mb-1 leading-snug hover:underline"
          style={{ color: 'var(--color-text)' }}
        >
          {product.name}
        </Link>
        <div className="flex flex-wrap gap-1 mb-3">
          {product.suitableFor.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: 'var(--color-text-muted)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold" style={{ color: 'var(--color-gold)' }}>
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-sm line-through" style={{ color: 'var(--color-text-muted)' }}>
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <button
            onClick={() => {
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
              });
              addToast('Добавлено в корзину');
            }}
            className="w-10 h-10 flex items-center justify-center rounded-xl text-lg transition-all duration-200"
            style={{
              background: 'rgba(212,168,83,0.1)',
              border: '1px solid rgba(212,168,83,0.2)',
              color: 'var(--color-gold)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-gold)';
              (e.currentTarget as HTMLElement).style.color = '#0a0a0a';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(212,168,83,0.1)';
              (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)';
            }}
            title="В корзину"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
