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
  }, [selectedCategory, selectedStone, selectedOccasion, selectedRecipient, priceRange, sort]);

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedStone('');
    setSelectedOccasion('');
    setSelectedRecipient('');
    setPriceRange([0, 1000]);
  };

  const hasActiveFilters = selectedCategory || selectedStone || selectedOccasion || selectedRecipient || priceRange[0] > 0 || priceRange[1] < 1000;

  const FilterSelect = ({ label, value, onChange, options }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
  }) => (
    <div className="mb-4">
      <label className="block text-xs font-semibold tracking-wider uppercase mb-2 text-gray-500">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-md text-sm appearance-none transition-colors border"
          style={{
            background: 'var(--color-bg)',
            color: 'var(--color-text-primary)',
            borderColor: 'var(--color-border)',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        >
          <option value="">Все</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
          ▼
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-24 min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">Каталог</h1>
          <p className="text-reading">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'товар' : filteredProducts.length < 5 ? 'товара' : 'товаров'}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters - Desktop */}
          <aside className="hidden lg:block w-[280px] flex-shrink-0">
            <div className="card sticky top-24 p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--color-border)]">
                <h3 className="text-sm font-semibold tracking-wider uppercase text-white m-0">Фильтры</h3>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-xs text-[var(--color-primary)] hover:underline bg-transparent border-none cursor-pointer">
                    Сбросить
                  </button>
                )}
              </div>

              <FilterSelect label="Категория" value={selectedCategory} onChange={setSelectedCategory} options={categories.map((c) => ({ value: c.slug, label: c.name }))} />
              <FilterSelect label="Камень" value={selectedStone} onChange={setSelectedStone} options={stones.map((s) => ({ value: s, label: s }))} />
              <FilterSelect label="Повод" value={selectedOccasion} onChange={setSelectedOccasion} options={occasions.map((o) => ({ value: o, label: o }))} />
              <FilterSelect label="Кому" value={selectedRecipient} onChange={setSelectedRecipient} options={recipients.map((r) => ({ value: r, label: r }))} />

              {/* Price range */}
              <div className="mb-4">
                <label className="block text-xs font-semibold tracking-wider uppercase mb-2 text-gray-500">Цена (BYN)</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 rounded-md text-sm text-white"
                    style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', outline: 'none' }}
                    placeholder="от"
                  />
                  <span className="text-gray-500">—</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-3 py-2 rounded-md text-sm text-white"
                    style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)', outline: 'none' }}
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
              <button className="lg:hidden btn-secondary" onClick={() => setShowFilters(!showFilters)}>
                {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
              </button>

              <div className="flex items-center gap-3 ml-auto">
                <span className="text-xs hidden sm:inline text-gray-500 uppercase tracking-wider font-semibold">Сортировка:</span>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortOption)}
                    className="pl-4 pr-10 py-2 rounded-md text-sm appearance-none transition-colors border text-white"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
                  >
                    <option value="popular">Популярные</option>
                    <option value="new">Новинки</option>
                    <option value="price-asc">Цена ↑</option>
                    <option value="price-desc">Цена ↓</option>
                  </select>
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">▼</div>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden card mb-6 animated-fadeIn">
                <div className="grid grid-cols-2 gap-4">
                  <FilterSelect label="Категория" value={selectedCategory} onChange={setSelectedCategory} options={categories.map((c) => ({ value: c.slug, label: c.name }))} />
                  <FilterSelect label="Камень" value={selectedStone} onChange={setSelectedStone} options={stones.map((s) => ({ value: s, label: s }))} />
                  <FilterSelect label="Повод" value={selectedOccasion} onChange={setSelectedOccasion} options={occasions.map((o) => ({ value: o, label: o }))} />
                  <FilterSelect label="Кому" value={selectedRecipient} onChange={setSelectedRecipient} options={recipients.map((r) => ({ value: r, label: r }))} />
                </div>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="mt-4 text-sm text-[var(--color-primary)] bg-transparent border-none cursor-pointer">
                    Сбросить все
                  </button>
                )}
              </div>
            )}

            {/* Products grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="card flex flex-col items-center justify-center py-24 text-center">
                <span className="text-6xl mb-6 opacity-50">🔍</span>
                <h3 className="text-xl mb-4">Ничего не найдено</h3>
                <p className="text-reading mb-6">Попробуйте изменить параметры фильтрации</p>
                <button onClick={clearFilters} className="btn-secondary">Сбросить фильтры</button>
              </div>
            )}
          </div>
        </div>
        <div className="h-20" />
      </div>
    </div>
  );
}
