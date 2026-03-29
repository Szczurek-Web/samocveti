import type { Product as DbProduct, Prisma } from '@prisma/client';
import type { Product as AppProduct, StoneInfo } from '@/data/products';

type ProductDescription = AppProduct['description'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function mapStone(stone: Prisma.JsonValue): StoneInfo {
  if (!isRecord(stone)) {
    throw new Error('Invalid stone payload');
  }

  const { name, properties, symbolism } = stone;
  if (typeof name !== 'string' || typeof properties !== 'string' || typeof symbolism !== 'string') {
    throw new Error('Invalid stone payload fields');
  }

  return { name, properties, symbolism };
}

function mapDescription(description: Prisma.JsonValue): ProductDescription {
  if (!isRecord(description)) {
    throw new Error('Invalid description payload');
  }

  const { short, full } = description;
  if (!Array.isArray(short) || !short.every((item) => typeof item === 'string') || typeof full !== 'string') {
    throw new Error('Invalid description payload fields');
  }

  return { short, full };
}

export function mapDbProduct(product: DbProduct): AppProduct {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    oldPrice: product.oldPrice ?? undefined,
    images: product.images,
    category: product.categoryId,
    stone: mapStone(product.stone),
    description: mapDescription(product.description),
    tags: product.tags,
    rating: product.rating,
    reviewCount: product.reviewCount,
    suitableFor: product.suitableFor,
    isNew: product.isNew,
    isPopular: product.isPopular,
    occasion: product.occasion.length > 0 ? product.occasion : undefined,
    type: product.type ?? undefined,
  };
}
