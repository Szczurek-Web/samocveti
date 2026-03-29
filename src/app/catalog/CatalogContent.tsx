'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { categories, stones, occasions, recipients } from '@/data/products';
import type { Product } from '@/data/products';
import ProductCard from '@/components/catalog/ProductCard';

type SortOption = 'popular' | 'new' | 'price-asc' | 'price-desc';

interface CatalogContentProps {
  products: Product[];
}

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}

function FilterSelect({ label, value, onChange, options }: FilterSelectProps) {
  return (
    <div className="mb-5">
      <label
        className="block text-xs font-semibold tracking-wider uppercase mb-2"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl text-sm appearance-none"
          style={{
            background: 'var(--color-bg-hover)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-border)',
            outline: 'none',
            cursor: 'pointer',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        >
          <option value="">Все</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none" style={{ color: 'var(--color-text-muted)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function CatalogContent({ products }: CatalogContentProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedStone, setSelectedStone] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sort, setSort] = useState<SortOption>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (selectedStone) result = result.filter((p) => p.stone.name === selectedStone);
    if (selectedOccasion) result = result.filter((p) => p.occasion?.includes(selectedOccasion));
    if (selectedRecipient) result = result.filter((p) => p.suitableFor.includes(selectedRecipient));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sort) {
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'new':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [products, selectedCategory, selectedStone, selectedOccasion, selectedRecipient, priceRange, sort]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedStone('');
    setSelectedOccasion('');
    setSelectedRecipient('');
    setPriceRange([0, 1000]);
  };

  const hasActiveFilters = selectedCategory || selectedStone || selectedOccasion || selectedRecipient || priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <h1
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Каталог
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : filteredProducts.length < 5 ? 'товара' : 'товаров'}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters - Desktop */}
          <aside className="hidden lg:block flex-shrink-0 w-[280px]">
            <div
              className="sticky top-24 p-6 rounded-2xl"
              style={{
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold tracking-wider uppercase" style={{ color: 'var(--color-text)' }}>
                  Фильтры
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs"
                    style={{ color: 'var(--color-gold)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    Сбросить
                  </button>
                )}
              </div>

              <FilterSelect
                label="Категория"
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={categories.map((c) => ({ value: c.slug, label: c.name }))}
              />
              <FilterSelect
                label="Камень"
                value={selectedStone}
                onChange={setSelectedStone}
                options={stones.map((s) => ({ value: s, label: s }))}
              />
              <FilterSelect
                label="Повод"
                value={selectedOccasion}
                onChange={setSelectedOccasion}
                options={occasions.map((o) => ({ value: o, label: o }))}
              />
              <FilterSelect
                label="Кому"
                value={selectedRecipient}
                onChange={setSelectedRecipient}
                options={recipients.map((r) => ({ value: r, label: r }))}
              />

              {/* Price range */}
              <div className="mb-4">
                <label
                  className="block text-xs font-semibold tracking-wider uppercase mb-2"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Цена (BYN)
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: 'var(--color-bg-hover)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                    }}
                    placeholder="от"
                  />
                  <span style={{ color: 'var(--color-text-muted)' }}>—</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-3 py-2 rounded-lg text-sm"
                    style={{
                      background: 'var(--color-bg-hover)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                    }}
                    placeholder="до"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <button
                className="lg:hidden btn-secondary text-sm px-4 py-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                🔍 Фильтры
              </button>

              <div className="flex items-center gap-3 ml-auto">
                <span className="text-xs hidden sm:inline" style={{ color: 'var(--color-text-muted)' }}>
                  Сортировка:
                </span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="pl-4 pr-10 py-2 rounded-xl text-sm appearance-none"
                    style={{
                      background: 'var(--color-bg-card)',
                      color: 'var(--color-text)',
                      border: '1px solid var(--color-border)',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  >
                    <option value="popular">Популярные</option>
                    <option value="new">Новинки</option>
                    <option value="price-asc">Цена ↑</option>
                    <option value="price-desc">Цена ↓</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none" style={{ color: 'var(--color-text-muted)' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div
                className="lg:hidden p-6 rounded-2xl mb-6"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  animation: 'slideUp 0.3s ease-out',
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <FilterSelect label="Категория" value={selectedCategory} onChange={setSelectedCategory} options={categories.map((c) => ({ value: c.slug, label: c.name }))} />
                  <FilterSelect label="Камень" value={selectedStone} onChange={setSelectedStone} options={stones.map((s) => ({ value: s, label: s }))} />
                  <FilterSelect label="Повод" value={selectedOccasion} onChange={setSelectedOccasion} options={occasions.map((o) => ({ value: o, label: o }))} />
                  <FilterSelect label="Кому" value={selectedRecipient} onChange={setSelectedRecipient} options={recipients.map((r) => ({ value: r, label: r }))} />
                </div>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="mt-4 text-sm" style={{ color: 'var(--color-gold)', background: 'none', border: 'none', cursor: 'pointer' }}>
                    Сбросить фильтры
                  </button>
                )}
              </div>
            )}

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center py-20 rounded-2xl"
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <span className="text-5xl mb-4">🔍</span>
                <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  Ничего не найдено
                </h3>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                  Попробуйте изменить параметры фильтрации
                </p>
                <button onClick={clearFilters} className="btn-primary text-sm px-6 py-3">
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="h-20" />
      </div>
    </div>
  );
}
