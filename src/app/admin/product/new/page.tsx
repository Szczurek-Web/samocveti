import ProductForm from '@/components/admin/ProductForm';
import { prisma } from '@/lib/db';
import { createProductAction } from '../actions';

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  });

  return <ProductForm mode="create" categories={categories} action={createProductAction} submitLabel="Создать" />;
}
