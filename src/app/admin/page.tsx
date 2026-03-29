import { prisma } from '@/lib/db';
import Link from 'next/link';
import AdminProductsTable from './AdminProductsTable';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const productsRaw = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const products = productsRaw.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    images: product.images,
    categoryName: product.category.name,
    inStock: product.inStock,
    isNew: product.isNew,
    isPopular: product.isPopular,
  }));

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

      <AdminProductsTable products={products} />
    </div>
  );
}
