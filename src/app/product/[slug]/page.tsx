import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/data/products';
import ProductContent from './ProductContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: 'Товар не найден — Samocveti' };
  }

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
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductContent productSlug={slug} />;
}
