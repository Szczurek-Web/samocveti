import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { prisma } from '@/lib/db';
import { updateProduct } from '@/app/admin/actions';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [categories, product] = await Promise.all([
    prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    }),
    prisma.product.findUnique({ where: { slug } }),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-serif" style={{ color: 'var(--color-gold)' }}>
        Редактирование товара
      </h1>

      <ProductForm
        mode="edit"
        submitAction={updateProduct}
        categories={categories}
        values={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: String(product.price),
          oldPrice: product.oldPrice ? String(product.oldPrice) : '',
          images: product.images.join('\n'),
          categoryId: product.categoryId,
          inStock: String(product.inStock),
          stoneName: typeof product.stone === 'object' && product.stone && 'name' in product.stone ? String(product.stone.name) : '',
          stoneProperties:
            typeof product.stone === 'object' && product.stone && 'properties' in product.stone
              ? String(product.stone.properties)
              : '',
          stoneSymbolism:
            typeof product.stone === 'object' && product.stone && 'symbolism' in product.stone
              ? String(product.stone.symbolism)
              : '',
          descriptionShort:
            typeof product.description === 'object' &&
              product.description &&
              'short' in product.description &&
              Array.isArray(product.description.short)
              ? product.description.short.join('\n')
              : '',
          descriptionFull:
            typeof product.description === 'object' && product.description && 'full' in product.description
              ? String(product.description.full)
              : '',
          tags: product.tags.join(', '),
          suitableFor: product.suitableFor.join(', '),
          occasion: product.occasion.join(', '),
          type: product.type || '',
          isNew: product.isNew,
          isPopular: product.isPopular,
        }}
      />
    </div>
  );
}
