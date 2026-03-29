'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import { useToastStore } from '@/store/toastStore';
import { deleteProduct, logoutAdmin } from './actions';

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  price: number;
  images: string[];
  categoryName: string;
  inStock: number;
  isNew: boolean;
  isPopular: boolean;
};

function ProductStatuses({ inStock, isNew, isPopular }: Pick<ProductRow, 'inStock' | 'isNew' | 'isPopular'>) {
  const badges: Array<{ label: string; color: string }> = [];

  if (inStock > 0) {
    badges.push({ label: `В наличии: ${inStock}`, color: 'bg-emerald-900/40 text-emerald-300 border-emerald-700/60' });
  } else {
    badges.push({ label: 'Нет в наличии', color: 'bg-rose-900/40 text-rose-300 border-rose-700/60' });
  }

  if (isNew) {
    badges.push({ label: 'Новинка', color: 'bg-blue-900/40 text-blue-300 border-blue-700/60' });
  }

  if (isPopular) {
    badges.push({ label: 'Популярный', color: 'bg-amber-900/40 text-amber-300 border-amber-700/60' });
  }

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${badge.color}`}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}

export default function AdminProductsTable({ products }: { products: ProductRow[] }) {
  const [search, setSearch] = useState('');
  const [productToDelete, setProductToDelete] = useState<ProductRow | null>(null);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [isDeleting, startDeleteTransition] = useTransition();
  const router = useRouter();
  const addToast = useToastStore((state) => state.addToast);

  const filteredProducts = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    if (!normalized) return products;

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalized) ||
        product.slug.toLowerCase().includes(normalized) ||
        product.categoryName.toLowerCase().includes(normalized)
      );
    });
  }, [products, search]);

  const handleDelete = () => {
    if (!productToDelete) return;

    startDeleteTransition(async () => {
      const result = await deleteProduct(productToDelete.id);

      if (result.success) {
        addToast(`Товар «${productToDelete.name}» удалён`, 'success');
        setProductToDelete(null);
        router.refresh();
        return;
      }

      addToast(result.error || 'Не удалось удалить товар', 'error');
    });
  };

  const handleEdit = (slug: string, id: string) => {
    setEditingProductId(id);
    router.push(`/admin/product/${slug}`);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 rounded-xl border border-gray-800 bg-[#121212] p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Поиск по названию, slug или категории..."
            className="w-full rounded-lg border border-gray-700 bg-[#0c0c0c] px-4 py-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:border-amber-600 focus:outline-none"
          />
        </div>

        <form action={logoutAdmin}>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:border-rose-500 hover:text-rose-300"
          >
            Выйти
          </button>
        </form>
      </div>

      <div className="bg-[#121212] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1a1a1a] border-b border-gray-800 text-sm uppercase tracking-wider text-gray-400">
              <th className="p-4">Фото</th>
              <th className="p-4">Название</th>
              <th className="p-4">Категория</th>
              <th className="p-4">Статусы</th>
              <th className="p-4">Цена</th>
              <th className="p-4">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-800 hover:bg-[#151515]">
                <td className="p-4">
                  <div
                    className="w-12 h-12 rounded bg-cover bg-center border border-gray-700"
                    style={{ backgroundImage: `url(${product.images[0]})` }}
                  />
                </td>
                <td className="p-4 font-medium">{product.name}</td>
                <td className="p-4 text-gray-300">{product.categoryName}</td>
                <td className="p-4"><ProductStatuses inStock={product.inStock} isNew={product.isNew} isPopular={product.isPopular} /></td>
                <td className="p-4 text-amber-500">{formatPrice(product.price)}</td>
                <td className="p-4 max-w-[220px]">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(product.slug, product.id)}
                      disabled={editingProductId === product.id}
                      className="inline-flex items-center justify-center rounded-md border border-blue-700/80 px-3 py-1.5 text-sm font-medium text-blue-300 transition hover:bg-blue-900/30 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {editingProductId === product.id ? 'Открываем...' : 'Edit'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setProductToDelete(product)}
                      disabled={isDeleting}
                      className="inline-flex items-center justify-center rounded-md border border-rose-700/80 px-3 py-1.5 text-sm font-medium text-rose-300 transition hover:bg-rose-900/30 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredProducts.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-500">
                  {products.length === 0 ? 'Товаров нет' : 'По вашему запросу ничего не найдено'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-xl border border-gray-800 bg-[#111] p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-white">Подтвердите удаление</h3>
            <p className="mt-2 text-sm text-gray-300">
              Вы уверены, что хотите удалить товар «{productToDelete.name}»? Действие нельзя отменить.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                disabled={isDeleting}
                className="rounded-md border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:border-gray-500 disabled:opacity-60"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-md border border-rose-700 bg-rose-900/40 px-4 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-900/70 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? 'Удаляем...' : 'Удалить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
