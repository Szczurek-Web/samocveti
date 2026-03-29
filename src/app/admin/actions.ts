'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

const REQUIRED_FIELDS = ['name', 'slug', 'price', 'categoryId', 'description', 'images'] as const;

type ProductPayload = {
  name?: unknown;
  slug?: unknown;
  price?: unknown;
  oldPrice?: unknown;
  categoryId?: unknown;
  inStock?: unknown;
  stone?: unknown;
  description?: unknown;
  images?: unknown;
  tags?: unknown;
  suitableFor?: unknown;
  occasion?: unknown;
  isNew?: unknown;
  isPopular?: unknown;
  type?: unknown;
};

function toRecord(input: FormData | ProductPayload): ProductPayload {
  if (input instanceof FormData) {
    const entries = Array.from(input.entries());
    return entries.reduce<ProductPayload>((acc, [key, value]) => {
      if (key in acc) {
        const current = acc[key as keyof ProductPayload];
        acc[key as keyof ProductPayload] = Array.isArray(current) ? [...current, value] : [current, value];
      } else {
        acc[key as keyof ProductPayload] = value;
      }
      return acc;
    }, {});
  }

  return input;
}

function safeJsonParse<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function parseStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => parseStringArray(item))
      .filter((item, index, source) => source.indexOf(item) === index);
  }

  if (typeof value !== 'string') {
    return [];
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return [];
  }

  const parsed = safeJsonParse<unknown>(trimmed);
  if (parsed && Array.isArray(parsed)) {
    return parsed
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (trimmed.includes(',')) {
    return trimmed
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [trimmed];
}

function parseJsonField(value: unknown): object {
  if (typeof value === 'object' && value !== null) {
    return value as object;
  }

  if (typeof value !== 'string') {
    return {};
  }

  const parsed = safeJsonParse<unknown>(value);
  return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? (parsed as object) : {};
}

function toNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.replace(',', '.').trim();
    if (!normalized) {
      return null;
    }
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function toBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    return normalized === 'true' || normalized === '1' || normalized === 'on' || normalized === 'yes';
  }

  return false;
}

function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let suffix = 1;

  while (true) {
    const existing = await prisma.product.findFirst({
      where: {
        slug,
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: { id: true },
    });

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

async function parseAndValidateProductInput(input: FormData | ProductPayload, excludeId?: string) {
  const payload = toRecord(input);

  for (const field of REQUIRED_FIELDS) {
    const value = payload[field];
    if (value === undefined || value === null || value === '') {
      throw new Error(`Поле ${field} обязательно`);
    }
  }

  const name = String(payload.name).trim();
  const requestedSlug = normalizeSlug(String(payload.slug));
  const price = toNumber(payload.price);
  const categoryId = String(payload.categoryId).trim();
  const images = parseStringArray(payload.images);

  if (!name) throw new Error('Поле name обязательно');
  if (!requestedSlug) throw new Error('Поле slug обязательно');
  if (price === null || price < 0) throw new Error('Поле price должно быть корректным числом');
  if (!categoryId) throw new Error('Поле categoryId обязательно');
  if (images.length === 0) throw new Error('Поле images обязательно и должно содержать хотя бы одно изображение');

  const slug = await ensureUniqueSlug(requestedSlug, excludeId);

  return {
    name,
    slug,
    price,
    oldPrice: toNumber(payload.oldPrice),
    categoryId,
    inStock: toNumber(payload.inStock) ?? 10,
    stone: parseJsonField(payload.stone),
    description: parseJsonField(payload.description),
    images,
    tags: parseStringArray(payload.tags),
    suitableFor: parseStringArray(payload.suitableFor),
    occasion: parseStringArray(payload.occasion),
    isNew: toBoolean(payload.isNew),
    isPopular: toBoolean(payload.isPopular),
    type: typeof payload.type === 'string' && payload.type.trim() ? payload.type.trim() : null,
  };
}

function revalidateProductPaths(slug: string) {
  revalidatePath('/admin');
  revalidatePath('/catalog');
  revalidatePath('/');
  revalidatePath(`/product/${slug}`);
}

export async function createProduct(formDataOrPayload: FormData | ProductPayload) {
  const data = await parseAndValidateProductInput(formDataOrPayload);

  const product = await prisma.product.create({
    data,
    select: { slug: true },
  });

  revalidateProductPaths(product.slug);

  return product;
}

export async function updateProduct(slugOrId: string, formDataOrPayload: FormData | ProductPayload) {
  const existing = await prisma.product.findFirst({
    where: {
      OR: [{ id: slugOrId }, { slug: slugOrId }],
    },
    select: { id: true, slug: true },
  });

  if (!existing) {
    throw new Error('Товар не найден');
  }

  const data = await parseAndValidateProductInput(formDataOrPayload, existing.id);

  const updated = await prisma.product.update({
    where: { id: existing.id },
    data,
    select: { slug: true },
  });

  revalidateProductPaths(existing.slug);
  if (updated.slug !== existing.slug) {
    revalidateProductPaths(updated.slug);
  }

  return updated;
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({
    where: { id },
    select: { slug: true },
  });

  revalidateProductPaths(product.slug);
}
