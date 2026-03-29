import { Suspense } from 'react';
import CatalogContent from './CatalogContent';
import { prisma } from '@/lib/db';
import { mapDbProduct } from '@/lib/productMapper';

export const revalidate = 3600;

export default async function CatalogPage() {
  const productsRaw = await prisma.product.findMany();
  
  // Transform db JSON fields to match the frontend Product interface
  const products = productsRaw.map(mapDbProduct);

  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: 'var(--color-bg)' }}
        >
          <div className="text-center">
            <span className="text-4xl block mb-4">💎</span>
            <p style={{ color: 'var(--color-text-secondary)' }}>Загрузка каталога...</p>
          </div>
        </div>
      }
    >
      <CatalogContent products={products} />
    </Suspense>
  );
}
