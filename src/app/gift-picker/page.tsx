import GiftPickerContent from './GiftPickerContent';
import { prisma } from '@/lib/db';
import { mapDbProduct } from '@/lib/productMapper';

export const revalidate = 3600;

export default async function GiftPickerPage() {
  const productsRaw = await prisma.product.findMany();
  
  const products = productsRaw.map(mapDbProduct);

  return <GiftPickerContent products={products} />;
}
