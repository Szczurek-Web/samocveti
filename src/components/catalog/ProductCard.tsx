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

  // Emotional hook: first sentence of stone symbolism
  const emotionalHook = product.stone.symbolism.split('.')[0] + '.';

  return (
    <div className="card group hover-lift relative overflow-hidden flex flex-col h-full z-0 p-0">
      {/* Image Container */}
      <div className="card-img h-[280px] rounded-t-[calc(var(--radius-card)-1px)] rounded-b-none relative group cursor-pointer border-b border-[var(--color-border)]">
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative z-10">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors z-10 pointer-events-none" />

        {/* Labels Map */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
          {product.isPopular && <span className="badge badge-error">🔥 Хит</span>}
          {product.isNew && <span className="badge badge-primary">✨ Новинка</span>}
          {product.oldPrice && (
            <span className="badge badge-success">
              -{Math.round((1 - product.price / product.oldPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Right side floating favorite */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id);
            addToast(fav ? 'Удалено из избранного' : 'Добавлено в избранное');
          }}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-md border border-white/10 transition-colors hover:bg-black/80"
          style={{ color: fav ? 'var(--color-error)' : 'white' }}
          title={fav ? "Удалить из избранного" : "В избранное"}
        >
          {fav ? '♥' : '♡'}
        </button>

        {/* Quick View CTA */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-30 pointer-events-none">
          <Link
            href={`/product/${product.slug}`}
            className="btn-secondary px-6 pointer-events-auto bg-black/80 backdrop-blur-md border-white/20 hover:border-[var(--color-primary)] hover:bg-[var(--color-surface)]"
          >
            Подробнее
          </Link>
        </div>
      </div>

      {/* Info Area */}
      <div className="flex flex-col flex-1 p-[24px]">
        {/* Rating & Stone */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-medium tracking-wide uppercase" style={{ color: 'var(--color-text-secondary)' }}>
            {product.stone.name}
          </span>
          <div className="flex items-center gap-1 text-[12px] font-bold" style={{ color: 'var(--color-primary)' }}>
            ★ {product.rating}
          </div>
        </div>
        
        {/* Title */}
        <Link href={`/product/${product.slug}`} className="mb-2 no-underline">
          <h3 className="card-title text-[18px] hover:text-[var(--color-primary)] transition-colors line-clamp-2 min-h-[44px]">
            {product.name}
          </h3>
        </Link>

        {/* Description / Hook */}
        <p className="card-desc mb-6 flex-1 text-[14px] leading-relaxed">
          {emotionalHook}
        </p>

        {/* Bottom / Add to Cart */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
          <div className="flex flex-col">
            <span className="text-[20px] font-bold" style={{ color: 'var(--color-text-primary)' }}>
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-[13px] line-through decoration-[var(--color-error)]" style={{ color: 'var(--color-text-secondary)' }}>
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
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
            className="btn-primary w-12 h-12 !p-0 rounded-full shadow-none hover:shadow-lg hover:-translate-y-1 transition-all"
            title="В корзину"
          >
            <span className="text-[20px] leading-none text-black">🛒</span>
          </button>
        </div>
      </div>
    </div>
  );
}
