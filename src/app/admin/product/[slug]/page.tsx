import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProductForm from './ProductForm';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function AdminProductPage({ params }: Props) {
  const { slug } = await params;
  const isNew = slug === 'new';

  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  let product = null;
  if (!isNew) {
    product = await prisma.product.findUnique({ where: { slug } });
    if (!product) notFound();
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6" style={{ color: '#fafafa' }}>
        {isNew ? '+ Новый товар' : `Редактирование: ${product?.name}`}
      </h1>
      <ProductForm
        product={product ? JSON.parse(JSON.stringify(product)) : null}
        categories={JSON.parse(JSON.stringify(categories))}
      />
    </div>
  );
}
