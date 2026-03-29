import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { prisma } from '@/lib/db';
import { updateProductAction } from '../actions';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { slug } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { slug } }),
    prisma.category.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true } }),
  ]);

  if (!product) {
    notFound();
  }

  const initialValues = {
    name: product.name,
    slug: product.slug,
    price: String(product.price),
    description:
      typeof product.description === 'object' && product.description !== null && 'full' in product.description
        ? String((product.description as { full?: string }).full ?? '')
        : '',
    categoryId: product.categoryId,
    isPopular: product.isPopular,
    isNew: product.isNew,
    image: product.images[0] ?? '',
  };

  const boundAction = updateProductAction.bind(null, product.id);

  return <ProductForm mode="edit" categories={categories} initialValues={initialValues} action={boundAction} submitLabel="Сохранить" />;
}
