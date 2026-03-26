'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { getProductById, products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useRecentStore } from '@/store/recentStore';
import { useToastStore } from '@/store/toastStore';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = getProductById(id);
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

  if (!product) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{ background: 'var(--color-bg)' }}
      >
        <span className="text-6xl mb-4">😔</span>
        <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
          Товар не найден
        </h1>
        <Link href="/catalog" className="btn-primary">
          Вернуться в каталог
        </Link>
      </div>
    );
  }

  const fav = isFavorite(product.id);

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

  const recentProducts = recentIds
    .filter((rid) => rid !== product.id)
    .map((rid) => getProductById(rid))
    .filter(Boolean)
    .slice(0, 4);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

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
            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden mb-4 flex items-center justify-center"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                height: '500px',
              }}
            >
              <span className="text-8xl opacity-30">💎</span>
              {/* Labels */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && <span className="badge">Новинка</span>}
                {product.oldPrice && (
                  <span className="badge-emerald badge">
                    -{Math.round((1 - product.price / product.oldPrice) * 100)}% скидка
                  </span>
                )}
              </div>
              {/* Favorite button */}
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

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((_, i) => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200"
                  style={{
                    background: 'var(--color-bg-card)',
                    border: i === 0 ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                  }}
                >
                  <span className="text-2xl opacity-40">💎</span>
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            {/* Stone name */}
            <div className="text-sm mb-2" style={{ color: 'var(--color-gold)' }}>
              {product.stone.name}
            </div>

            {/* Title */}
            <h1
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span
                    key={j}
                    style={{ color: j < Math.floor(product.rating) ? 'var(--color-gold)' : 'var(--color-text-muted)' }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {product.rating} ({product.reviewCount} отзывов)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span
                className="text-3xl font-bold"
                style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}
              >
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <span
                  className="text-xl line-through"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {formatPrice(product.oldPrice)}
                </span>
              )}
            </div>

            {/* CTA Buttons */}
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

            {/* Short description */}
            <div
              className="p-6 rounded-2xl mb-6"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3
                className="text-sm font-semibold tracking-wider uppercase mb-4"
                style={{ color: 'var(--color-text)' }}
              >
                Характеристики
              </h3>
              <ul className="flex flex-col gap-2.5" style={{ listStyle: 'none', padding: 0 }}>
                {product.description.short.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <span style={{ color: 'var(--color-gold)' }}>✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Full description */}
            <div className="mb-6">
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{
                  color: 'var(--color-gold)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {showFullDesc ? 'Скрыть описание ▲' : 'Подробное описание ▼'}
              </button>
              {showFullDesc && (
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{
                    color: 'var(--color-text-secondary)',
                    animation: 'fadeIn 0.3s ease-out',
                  }}
                >
                  {product.description.full}
                </p>
              )}
            </div>

            {/* Suitable for */}
            <div className="mb-6">
              <h3
                className="text-sm font-semibold tracking-wider uppercase mb-3"
                style={{ color: 'var(--color-text)' }}
              >
                Кому подойдёт
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.suitableFor.map((item) => (
                  <span key={item} className="badge">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stone section */}
        <div
          className="p-8 md:p-12 rounded-2xl mb-16"
          style={{
            background: 'linear-gradient(135deg, var(--color-bg-card), var(--color-bg-elevated))',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-4xl mb-4 block">💎</span>
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}
            >
              {product.stone.name}
            </h2>
            <div className="divider my-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div>
                <h4
                  className="text-xs font-semibold tracking-wider uppercase mb-3"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Свойства
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {product.stone.properties}
                </p>
              </div>
              <div>
                <h4
                  className="text-xs font-semibold tracking-wider uppercase mb-3"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Символика
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {product.stone.symbolism}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Похожие товары
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="block no-underline rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="h-[180px] flex items-center justify-center"
                    style={{ background: 'var(--color-bg-hover)' }}
                  >
                    <span className="text-5xl opacity-30">💎</span>
                  </div>
                  <div className="p-4">
                    <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
                      {p.stone.name}
                    </div>
                    <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                      {p.name}
                    </div>
                    <div className="font-bold" style={{ color: 'var(--color-gold)' }}>
                      {formatPrice(p.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Recently viewed */}
        {recentProducts.length > 0 && (
          <div className="mb-16">
            <h2
              className="text-2xl font-bold mb-8"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Недавно просмотренные
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {recentProducts.map((p) => p && (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="block no-underline rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="h-[140px] flex items-center justify-center"
                    style={{ background: 'var(--color-bg-hover)' }}
                  >
                    <span className="text-4xl opacity-30">💎</span>
                  </div>
                  <div className="p-4">
                    <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>
                      {p.stone.name}
                    </div>
                    <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                      {p.name}
                    </div>
                    <div className="font-bold" style={{ color: 'var(--color-gold)' }}>
                      {formatPrice(p.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
