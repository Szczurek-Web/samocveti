import { prisma } from '@/lib/db';
import ProductForm from '@/components/admin/ProductForm';
import { createProduct } from '@/app/admin/actions';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-serif" style={{ color: 'var(--color-gold)' }}>
        Новый товар
      </h1>

      <ProductForm
        mode="new"
        submitAction={createProduct}
        categories={categories}
        values={{
          name: '',
          slug: '',
          price: '',
          oldPrice: '',
          images: '',
          categoryId: '',
          inStock: '10',
          stoneName: '',
          stoneProperties: '',
          stoneSymbolism: '',
          descriptionShort: '',
          descriptionFull: '',
          tags: '',
          suitableFor: '',
          occasion: '',
          type: '',
          isNew: false,
          isPopular: false,
        }}
      />
    </div>
  );
}
