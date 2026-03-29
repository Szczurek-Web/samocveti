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

  const ordersRaw = await prisma.order.findMany();
  
  const revenue = ordersRaw.reduce((sum, o) => sum + o.total, 0);
  const ordersCount = ordersRaw.length;
  // Mock conversion for luxury e-commerce
  const conversionRate = (ordersCount > 0 ? (ordersCount * 0.42).toFixed(1) : '2.4');

  const stats = [
    { label: 'Выручка', value: formatPrice(revenue), icon: '💰', trend: '+12.5%', isUp: true },
    { label: 'Заказы', value: ordersCount, icon: '📦', trend: '+5.2%', isUp: true },
    { label: 'Конверсия', value: `${conversionRate}%`, icon: '📈', trend: '-1.1%', isUp: false },
    { label: 'Товары', value: products.length, icon: '💎', trend: '+3', isUp: true },
  ];

  return (
    <div>
      {/* Bento Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="p-5 rounded-2xl relative overflow-hidden group hover-lift"
            style={{ 
              background: 'var(--color-bg-card)', 
              border: '1px solid var(--color-border)',
            }}
          >
            {/* Subtle glow on hover */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
                 style={{ background: 'radial-gradient(circle, rgba(212,168,83,0.1) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
            
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                   style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                {s.icon}
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-md"
                    style={{ 
                      background: s.isUp ? 'rgba(45,107,79,0.15)' : 'rgba(239,68,68,0.15)', 
                      color: s.isUp ? 'var(--color-emerald-light)' : '#f87171' 
                    }}>
                {s.trend}
              </span>
            </div>
            
            <div>
              <div className="text-2xl font-bold mb-1 tracking-tight" style={{ color: 'var(--color-text)' }}>
                {s.value}
              </div>
              <div className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                {s.label}
              </div>
            </div>
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
