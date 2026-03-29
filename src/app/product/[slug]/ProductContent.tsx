'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useRecentStore } from '@/store/recentStore';
import { useToastStore } from '@/store/toastStore';
import type { Product } from '@/data/products';

interface Props {
  product: Product;
  relatedProducts: Product[];
  crossSellProducts: Product[];
}

export default function ProductContent({ product, relatedProducts, crossSellProducts }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const addRecent = useRecentStore((s) => s.addRecent);
  const recentIds = useRecentStore((s) => s.recentIds);
  const addToast = useToastStore((s) => s.addToast);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (product) addRecent(product.id);
  }, [product, addRecent]);


  const fav = isFavorite(product.id);
  const purchaseCount = product.reviewCount * 5 + Math.floor(Number(product.id) * 7);
  const fakeStock = 3 + (Number(product.id) % 5);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    addToast('Добавлено в корзину');
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const recentProducts = useMemo(() => {
    if (recentIds.length === 0) return [];

    const pool = [product, ...relatedProducts, ...crossSellProducts];
    const byId = new Map(pool.map((item) => [item.id, item]));

    return recentIds
      .filter((id) => id !== product.id)
      .map((id) => byId.get(id))
      .filter((item): item is Product => Boolean(item))
      .slice(0, 4);
  }, [recentIds, product, relatedProducts, crossSellProducts]);

  // Occasion icons mapping
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
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
          <Link href="/" className="no-underline hover:underline" style={{ color: 'inherit' }}>
            Главная
          </Link>
          <span>/</span>
          <Link href="/catalog" className="no-underline hover:underline" style={{ color: 'inherit' }}>
            Каталог
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--color-text-secondary)' }}>{product.name}</span>
        </nav>

        {/* Main section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Gallery */}
          <div>
            <div
              className="relative rounded-2xl overflow-hidden mb-4 flex items-center justify-center group"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                height: '500px',
              }}
            >
              {/* Main product image overlay */}
              <div
                className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${product.images[0]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isPopular && <span className="badge badge-hot">🔥 Хит подарков</span>}
                {product.isNew && <span className="badge">✨ Новинка</span>}
                {product.oldPrice && (
                  <span className="badge-emerald badge">
                    -{Math.round((1 - product.price / product.oldPrice) * 100)}% скидка
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  toggleFavorite(product.id);
                  addToast(fav ? 'Удалено из избранного' : 'Добавлено в избранное');
                }}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  background: 'rgba(10,10,10,0.6)',
                  backdropFilter: 'blur(8px)',
                  border: 'none',
                  cursor: 'pointer',
                  color: fav ? '#ef4444' : 'var(--color-text-muted)',
                  fontSize: '20px',
                }}
              >
                {fav ? '♥' : '♡'}
              </button>
            </div>
            <div className="flex gap-3 mt-4">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-24 h-24 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 overflow-hidden"
                  style={{
                    background: 'var(--color-bg-card)',
                    border: i === 0 ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                  }}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-300 hover:scale-110"
                    style={{
                      backgroundImage: `url(${img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  {i !== 0 && (
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors duration-300" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="text-sm mb-2" style={{ color: 'var(--color-gold)' }}>
              {product.stone.name}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} style={{ color: j < Math.floor(product.rating) ? 'var(--color-gold)' : 'var(--color-text-muted)' }}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {product.rating} ({product.reviewCount} отзывов)
              </span>
            </div>

            {/* Social proof + urgency */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="social-proof">
                <span className="social-proof-dot" />
                <span>Купили {purchaseCount} раз</span>
              </div>
              <span
                className="text-[11px] px-2.5 py-1 rounded-full"
                style={{
                  background: 'rgba(251, 146, 60, 0.1)',
                  color: '#fb923c',
                  border: '1px solid rgba(251, 146, 60, 0.2)',
                }}
              >
                Осталось {fakeStock} шт
              </span>
              {product.isPopular && (
                <span
                  className="text-[11px] px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#f87171',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                  }}
                >
                  Популярный товар
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}>
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-xl line-through" style={{ color: 'var(--color-text-muted)' }}>
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 text-base py-4"
                style={{
                  background: addedToCart
                    ? 'linear-gradient(135deg, var(--color-emerald), var(--color-emerald-light))'
                    : undefined,
                }}
              >
                {addedToCart ? '✓ Добавлено!' : '🛒 В корзину'}
              </button>
              <Link href="/checkout" className="btn-secondary flex-1 text-base py-4 text-center">
                Купить сейчас
              </Link>
            </div>

            {/* Specs */}
            <div className="p-6 rounded-2xl mb-6" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
              <h3 className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color: 'var(--color-text)' }}>
                Характеристики
              </h3>
              <ul className="flex flex-col gap-2.5" style={{ listStyle: 'none', padding: 0 }}>
                {product.description.short.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-gold)' }}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: 'var(--color-gold)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {showFullDesc ? 'Скрыть описание ▲' : 'Подробное описание ▼'}
              </button>
              {showFullDesc && (
                <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)', animation: 'fadeIn 0.3s ease-out' }}>
                  {product.description.full}
                </p>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold tracking-wider uppercase mb-3" style={{ color: 'var(--color-text)' }}>
                Кому подойдёт
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.suitableFor.map((item) => (
                  <span key={item} className="badge">{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== STONE MEANING SECTION ===== */}
        <div
          className="p-8 md:p-12 rounded-2xl mb-10"
          style={{
            background: 'linear-gradient(135deg, var(--color-bg-card), var(--color-bg-elevated))',
            border: '1px solid var(--color-border)',
            animation: 'fadeIn 0.6s ease-out',
          }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-4xl mb-4 block">💎</span>
            <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>
              Смысл изделия — {product.stone.name}
            </h2>
            <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
              Каждый камень несёт в себе особое значение
            </p>
            <div className="divider my-6" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-6 rounded-xl" style={{ background: 'rgba(212,168,83,0.04)', border: '1px solid rgba(212,168,83,0.1)' }}>
                <span className="text-3xl block mb-3">🛡️</span>
                <h4 className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: 'var(--color-gold)' }}>
                  Защита
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {product.stone.symbolism}
                </p>
              </div>
              <div className="p-6 rounded-xl" style={{ background: 'rgba(45,107,79,0.04)', border: '1px solid rgba(45,107,79,0.1)' }}>
                <span className="text-3xl block mb-3">⚡</span>
                <h4 className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: 'var(--color-emerald-light)' }}>
                  Энергия
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {product.stone.properties}
                </p>
              </div>
              <div className="p-6 rounded-xl" style={{ background: 'rgba(139,34,82,0.04)', border: '1px solid rgba(139,34,82,0.1)' }}>
                <span className="text-3xl block mb-3">🔮</span>
                <h4 className="text-xs font-semibold tracking-wider uppercase mb-3" style={{ color: '#c084a8' }}>
                  Символика
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {product.stone.symbolism.split('.').slice(1).join('.').trim() || product.stone.symbolism}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== WHEN TO GIVE SECTION ===== */}
        {product.occasion && product.occasion.length > 0 && (
          <div
            className="p-8 md:p-10 rounded-2xl mb-16"
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            <h2 className="text-2xl font-bold mb-2 text-center" style={{ fontFamily: 'var(--font-serif)' }}>
              Когда дарить
            </h2>
            <p className="text-sm text-center mb-8" style={{ color: 'var(--color-text-muted)' }}>
              Идеальный подарок для каждого повода
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {product.occasion.map((occ) => (
                <div
                  key={occ}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-200"
                  style={{
                    background: 'var(--color-bg-hover)',
                    border: '1px solid var(--color-border)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-gold)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(212,168,83,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--color-bg-hover)';
                  }}
                >
                  <span className="text-xl">{occasionIcons[occ] || '🎁'}</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{occ}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
              Похожие товары
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="block no-underline rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  <div
                    className="h-[180px] relative overflow-hidden flex items-center justify-center"
                    style={{ background: 'var(--color-bg-hover)' }}
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-500 hover:scale-110"
                      style={{
                        backgroundImage: `url(${p.images[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>{p.stone.name}</div>
                    <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>{p.name}</div>
                    <div className="font-bold" style={{ color: 'var(--color-gold)' }}>{formatPrice(p.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Cross-sell */}
        {crossSellProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
              С этим покупают
            </h2>
            <p className="mb-8 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Дополните подарок — вместе смотрится ещё лучше
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {crossSellProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="block no-underline rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  <div
                    className="h-[180px] relative overflow-hidden flex items-center justify-center"
                    style={{ background: 'var(--color-bg-hover)' }}
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-500 hover:scale-110"
                      style={{
                        backgroundImage: `url(${p.images[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>{p.stone.name}</div>
                    <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>{p.name}</div>
                    <div className="font-bold" style={{ color: 'var(--color-gold)' }}>{formatPrice(p.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recently viewed */}
        {recentProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
              Недавно просмотренные
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {recentProducts.map((p) => p && (
                <Link
                  key={p.id}
                  href={`/product/${p.slug}`}
                  className="block no-underline rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  <div
                    className="h-[140px] relative overflow-hidden flex items-center justify-center"
                    style={{ background: 'var(--color-bg-hover)' }}
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-500 hover:scale-110"
                      style={{
                        backgroundImage: `url(${p.images[0]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>{p.stone.name}</div>
                    <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>{p.name}</div>
                    <div className="font-bold" style={{ color: 'var(--color-gold)' }}>{formatPrice(p.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mobile sticky CTA */}
        <div
          className="fixed bottom-0 left-0 right-0 p-4 lg:hidden z-40"
          style={{
            background: 'rgba(10,10,10,0.95)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div className="flex gap-3">
            <button onClick={handleAddToCart} className="btn-primary flex-1 py-3.5 text-sm">
              {addedToCart ? '✓ Добавлено!' : '🛒 В корзину — ' + formatPrice(product.price)}
            </button>
          </div>
        </div>
        <div className="h-20 lg:hidden" /> {/* spacer for sticky CTA */}
      </div>
    </div>
  );
}
