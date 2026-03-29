import FavoritesContent from './FavoritesContent';
import { prisma } from '@/lib/db';
import type { Product } from '@/data/products';

export const revalidate = 3600;

export default async function FavoritesPage() {
  const productsRaw = await prisma.product.findMany();
  
  const products: Product[] = productsRaw.map((p: any) => ({
    ...p,
    stone: p.stone as any,
    description: p.description as any,
    oldPrice: p.oldPrice || undefined,
    type: p.type || undefined,
  }));

  return <FavoritesContent products={products} />;
}
