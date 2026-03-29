import { prisma } from '@/lib/db';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { deleteProduct } from './actions';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const productsRaw = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-serif" style={{ color: 'var(--color-gold)' }}>
          Товары в магазине
        </h1>
        <Link 
          href="/admin/product/new" 
          className="bg-amber-600 hover:bg-amber-500 text-black font-semibold py-2 px-6 rounded-lg transition"
        >
          + Добавить товар
        </Link>
      </div>

      <div className="bg-[#121212] rounded-xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1a1a1a] border-b border-gray-800 text-sm uppercase tracking-wider text-gray-400">
              <th className="p-4">Фото</th>
              <th className="p-4">Название</th>
              <th className="p-4">Цена</th>
              <th className="p-4">Действия</th>
            </tr>
          </thead>
          <tbody>
            {productsRaw.map((p) => (
              <tr key={p.id} className="border-b border-gray-800 hover:bg-[#151515]">
                <td className="p-4">
                  <div 
                    className="w-12 h-12 rounded bg-cover bg-center border border-gray-700" 
                    style={{ backgroundImage: `url(${p.images[0]})` }} 
                  />
                </td>
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-amber-500">{formatPrice(p.price)}</td>
                <td className="p-4 max-w-[150px]">
                  <div className="flex gap-3">
                    <Link href={`/admin/product/${p.slug}`} className="text-blue-400 hover:text-blue-300">
                      Редактировать
                    </Link>
                    <form action={async () => {
                      'use server';
                      await deleteProduct(p.id);
                    }}>
                      <button type="submit" className="text-red-500 hover:text-red-400">
                        Удалить
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {productsRaw.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-500">
                  Товаров нет
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
