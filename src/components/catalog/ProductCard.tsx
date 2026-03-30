'use client';

import Link from 'next/link';
import Image from 'next/image';
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

  // Social proof: simulate purchase count based on reviews
  const purchaseCount = product.reviewCount * 5 + Math.floor(Number(product.id) * 7);

  // Emotional hook: first sentence of stone symbolism
  const emotionalHook = product.stone.symbolism.split('.')[0] + '.';

  return (
    <div
      className="group rounded-2xl overflow-hidden transition-all duration-500 relative bg-[#141414] border border-[#2a2520]"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.8)';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold-dark)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
      }}
    >
      {/* Image Container */}
      <div className="relative h-[280px] w-full overflow-hidden bg-[#1a1a1e]">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative cursor-pointer">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent pointer-events-none" />

        {/* Labels Map */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isPopular && <span className="badge badge-hot text-xs px-2.5 shadow-lg">🔥 Хит</span>}
          {product.isNew && <span className="badge text-xs px-2.5 shadow-lg">✨ Новинка</span>}
          {product.oldPrice && (
            <span className="badge-emerald badge text-xs px-2.5 shadow-lg">
              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-medium z-10 text-amber-500">
          ★ {product.rating} <span className="text-gray-400">({product.reviewCount})</span>
        </div>

        {/* Quick Actions (Hover Overlay) */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 z-20 pointer-events-none">
          <div className="quick-actions flex items-center gap-3 pointer-events-auto">
            {/* Quick View */}
            <Link
              href={`/product/${product.slug}`}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#111]/80 backdrop-blur-md border border-white/10 text-xl text-white transition-all hover:bg-white hover:text-black hover:scale-110 shadow-xl"
              title="Смотреть"
            >
              👁
            </Link>
            {/* Add to Cart */}
            <button
              onClick={() => {
                addItem({
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  image: product.images[0],
                });
                addToast('В корзине');
              }}
              className="w-14 h-14 flex items-center justify-center rounded-full bg-amber-500 text-2xl text-black transition-all hover:bg-amber-400 hover:scale-110 shadow-[0_0_20px_rgba(212,168,83,0.4)]"
              title="В корзину"
            >
              🛒
            </button>
            {/* Favorite */}
            <button
              onClick={() => {
                toggleFavorite(product.id);
                addToast(fav ? 'Удалено из избранного' : 'Добавлено в избранное');
              }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-[#111]/80 backdrop-blur-md border border-white/10 text-xl transition-all hover:bg-white hover:scale-110 shadow-xl"
              style={{ color: fav ? '#ef4444' : '#fafafa' }}
              title="В избранное"
            >
              {fav ? '♥' : '♡'}
            </button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="text-xs mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
          {product.stone.name}
        </div>
        <Link
          href={`/product/${product.slug}`}
          className="block no-underline text-sm font-medium mb-1 leading-snug hover:underline"
          style={{ color: 'var(--color-text)' }}
        >
          {product.name}
        </Link>

        {/* Emotional hook */}
        <p
          className="text-[11px] leading-relaxed mb-2"
          style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}
        >
          {emotionalHook}
        </p>

        {/* Suitable for tags */}
        <div className="flex flex-wrap gap-1 mb-2">
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

        {/* Social proof */}
        <div className="social-proof mb-3">
          <span className="social-proof-dot" />
          <span>Купили {purchaseCount} раз</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex flex-col">
            {product.oldPrice && (
              <span className="text-[11px] line-through text-gray-500 mb-0.5">
                {formatPrice(product.oldPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-amber-500">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
