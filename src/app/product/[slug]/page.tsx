import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductContent from './ProductContent';
import { prisma } from '@/lib/db';
import { mapDbProduct } from '@/lib/productMapper';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const productRaw = await prisma.product.findUnique({ where: { slug } });

  if (!productRaw) {
    return { title: 'Товар не найден — Samocveti' };
  }

  const product = mapDbProduct(productRaw);

  return {
    title: `${product.name} — купить в Samocveti`,
    description: product.description.full.slice(0, 160),
    openGraph: {
      title: `${product.name} — Samocveti`,
      description: product.description.full.slice(0, 160),
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const products = await prisma.product.findMany({ select: { slug: true } });
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  
  const productRaw = await prisma.product.findUnique({ where: { slug } });
  if (!productRaw) notFound();
  
  const product = mapDbProduct(productRaw);

  const relatedRaw = await prisma.product.findMany({
    where: { categoryId: productRaw.categoryId, NOT: { id: productRaw.id } },
    take: 4,
  });

  const allCrossRaw = await prisma.product.findMany({
    where: { NOT: { id: productRaw.id, categoryId: productRaw.categoryId } },
  });

  // Filter cross-sell based on suitableFor overlap
  const crossSellRaw = allCrossRaw
    .filter((p) => p.suitableFor.some((s) => product.suitableFor.includes(s)))
    .slice(0, 4);

  return (
    <ProductContent 
      product={product} 
      relatedProducts={relatedRaw.map(mapDbProduct)} 
      crossSellProducts={crossSellRaw.map(mapDbProduct)} 
    />
  );
}
