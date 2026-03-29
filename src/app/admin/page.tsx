import { prisma } from '@/lib/db';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import AdminProductTable from './AdminProductTable';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });

  const stats = {
    total: products.length,
    popular: products.filter((p: any) => p.isPopular).length,
    newItems: products.filter((p: any) => p.isNew).length,
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Всего товаров', value: stats.total, icon: '📦' },
          { label: 'Популярные', value: stats.popular, icon: '🔥' },
          { label: 'Новинки', value: stats.newItems, icon: '✨' },
        ].map((s) => (
          <div
            key={s.label}
            className="p-4 rounded-xl"
            style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl font-bold" style={{ color: '#fafafa' }}>{s.value}</div>
            <div className="text-xs" style={{ color: '#71717a' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold" style={{ color: '#fafafa' }}>
          Товары
        </h1>
        <Link
          href="/admin/product/new"
          className="no-underline flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{
            background: '#d4a853',
            color: '#09090b',
          }}
        >
          <span>+</span> Добавить товар
        </Link>
      </div>

      {/* Table */}
      <AdminProductTable products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}
