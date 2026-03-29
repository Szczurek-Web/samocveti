'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useRecentStore } from '@/store/recentStore';
import { useToastStore } from '@/store/toastStore';
import type { Product } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';

interface Props {
  product: Product;
  relatedProducts: Product[];
  crossSellProducts: Product[];
}

export default function ProductContent({ product, relatedProducts, crossSellProducts }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const addRecent = useRecentStore((s) => s.addRecent);
  const addToast = useToastStore((s) => s.addToast);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (product) addRecent(product.id);
  }, [product, addRecent]);

  if (!product) return null;

  const fav = isFavorite(product.id);
  const purchaseCount = product.reviewCount * 5 + Math.floor(Number(product.id) * 7);
  const fakeStock = 3 + (Number(product.id) % 5);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    addToast('Добавлено в корзину');
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const occasionIcons: Record<string, string> = {
    'День рождения': '🎂',
    'Юбилей': '🏆',
    '8 марта': '🌷',
    '23 февраля': '⭐',
    '14 февраля': '💕',
    'Новый год': '🎄',
    'Новоселье': '🏠',
    'Свадьба': '💍',
    'Без повода': '💫',
    'Повышение': '📈',
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[var(--color-bg)]">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-small mb-8 text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">Главная</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-white transition-colors">Каталог</Link>
          <span>/</span>
          <span className="text-[var(--color-text-secondary)]">{product.name}</span>
        </nav>

        {/* Main section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative rounded-[calc(var(--radius-card)+8px)] overflow-hidden h-[500px] border border-[var(--color-border)] group bg-[var(--color-surface)]">
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${product.images[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.isPopular && <span className="badge badge-error">🔥 Хит подарков</span>}
                {product.isNew && <span className="badge badge-primary">✨ Новинка</span>}
                {product.oldPrice && (
                  <span className="badge badge-success">
                    -{Math.round((1 - product.price / product.oldPrice) * 100)}% скидка
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  toggleFavorite(product.id);
                  addToast(fav ? 'Удалено из избранного' : 'Добавлено в избранное');
                }}
                className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 transition-colors hover:bg-black/80 z-10"
                style={{ color: fav ? 'var(--color-error)' : 'white' }}
              >
                {fav ? '♥' : '♡'}
              </button>
            </div>
            
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-24 h-24 rounded-xl flex-shrink-0 cursor-pointer overflow-hidden border border-[var(--color-border)]"
                >
                  <div
                    className="absolute inset-0 transition-transform duration-300 hover:scale-110"
                    style={{
                      backgroundImage: `url(${img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="text-small font-semibold tracking-wider uppercase mb-2 text-[var(--color-primary)]">
              {product.stone.name}
            </div>
            <h1 className="mb-4 text-4xl lg:text-5xl">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="flex text-lg" style={{ color: 'var(--color-primary)' }}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className={j >= Math.floor(product.rating) ? 'opacity-30' : ''}>★</span>
                ))}
              </div>
              <span className="text-small">
                {product.rating} ({product.reviewCount} отзывов)
              </span>
            </div>

            {/* Social proof + urgency */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <div className="badge border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]">
                Купили {purchaseCount} раз
              </div>
              <div className="badge badge-error bg-red-500/10 text-red-400 border-red-500/20">
                Осталось {fakeStock} шт
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[var(--color-border)]">
              <span className="text-4xl font-bold flex items-center h-full text-[var(--color-text-primary)]">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xl line-through text-[var(--color-text-secondary)]">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button onClick={handleAddToCart} className="btn-primary flex-1 h-14 text-lg">
                {addedToCart ? '✓ В корзине' : '🛒 Добавить в корзину'}
              </button>
              <Link href="/checkout" className="btn-secondary flex-1 h-14 text-lg items-center justify-center flex">
                Купить сейчас
              </Link>
            </div>

            {/* Specs */}
            <div className="card mb-6">
              <h3 className="text-sm tracking-wider uppercase mb-4 text-[var(--color-text-primary)]">Характеристики</h3>
              <ul className="flex flex-col gap-3">
                {product.description.short.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[var(--color-text-secondary)]">
                    <span className="text-[var(--color-primary)] shrink-0">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="btn-tertiary px-0 !text-sm"
              >
                {showFullDesc ? 'Скрыть описание ▲' : 'Подробное описание ▼'}
              </button>
              {showFullDesc && (
                <p className="mt-4 text-reading animated-fadeIn">
                  {product.description.full}
                </p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-sm tracking-wider uppercase mb-4 text-[var(--color-text-primary)]">Кому подойдёт</h3>
              <div className="flex flex-wrap gap-2">
                {product.suitableFor.map((item) => (
                  <span key={item} className="badge bg-[var(--color-surface)] border border-[var(--color-border)]">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== STONE MEANING SECTION ===== */}
        <div className="card p-8 md:p-12 text-center mb-16 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
             <span className="text-5xl mb-6 block">💎</span>
             <h2 className="mb-4 text-[var(--color-primary)]">Смысл изделия — {product.stone.name}</h2>
             <p className="text-reading mx-auto mb-10">Каждый камень несёт в себе особое значение</p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-transparent">
               <div className="card bg-black/20 border-white/5">
                 <span className="text-4xl mb-4 block">🛡️</span>
                 <h4 className="text-xs tracking-wider uppercase mb-3 text-[var(--color-primary)]">Защита</h4>
                 <p className="text-small">{product.stone.symbolism}</p>
               </div>
               <div className="card bg-black/20 border-white/5">
                 <span className="text-4xl mb-4 block">⚡</span>
                 <h4 className="text-xs tracking-wider uppercase mb-3 text-[var(--color-secondary)]">Энергия</h4>
                 <p className="text-small">{product.stone.properties}</p>
               </div>
               <div className="card bg-black/20 border-white/5">
                 <span className="text-4xl mb-4 block">🔮</span>
                 <h4 className="text-xs tracking-wider uppercase mb-3 text-purple-400">Символика</h4>
                 <p className="text-small">{product.stone.symbolism.split('.').slice(1).join('.').trim() || product.stone.symbolism}</p>
               </div>
             </div>
          </div>
        </div>

        {/* ===== WHEN TO GIVE SECTION ===== */}
        {product.occasion && product.occasion.length > 0 && (
          <div className="mb-16">
            <h2 className="text-center mb-4">Когда дарить</h2>
            <p className="text-reading text-center mx-auto mb-8">Идеальный подарок для каждого повода</p>
            <div className="flex flex-wrap justify-center gap-4">
              {product.occasion.map((occ) => (
                <div key={occ} className="card !p-4 !flex-row items-center gap-3 hover:border-[var(--color-primary)] cursor-pointer hover:bg-[var(--color-primary)]/5">
                  <span className="text-2xl">{occasionIcons[occ] || '🎁'}</span>
                  <span className="font-semibold">{occ}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cross-sell & Related */}
        {crossSellProducts.length > 0 && (
          <div className="mb-16 pt-8 border-t border-[var(--color-border)]">
            <h2 className="mb-8">С этим покупают</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {crossSellProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
        
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="mb-8">Похожие товары</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Mobile sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 lg:hidden z-40 bg-[var(--color-bg)]/95 backdrop-blur-md border-t border-[var(--color-border)]">
        <button onClick={handleAddToCart} className="btn-primary w-full h-12">
          {addedToCart ? '✓ В корзине' : `Купить за ${formatPrice(product.price)}`}
        </button>
      </div>
    </div>
  );
}
