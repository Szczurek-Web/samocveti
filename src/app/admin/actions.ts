'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/admin-auth';

async function guardAdminAction() {
  await requireAdminSession({ onFail: 'throw' });
}

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? '').trim();
}

function getNumberOrNull(formData: FormData, key: string) {
  const raw = getString(formData, key);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

function parseList(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeProductPayload(formData: FormData) {
  const name = getString(formData, 'name');
  const slug = getString(formData, 'slug');
  const price = getNumberOrNull(formData, 'price') ?? 0;
  const oldPrice = getNumberOrNull(formData, 'oldPrice');
  const categoryId = getString(formData, 'categoryId');
  const inStock = getNumberOrNull(formData, 'inStock') ?? 0;

  const images = parseList(getString(formData, 'images'));
  const tags = parseList(getString(formData, 'tags'));
  const suitableFor = parseList(getString(formData, 'suitableFor'));
  const occasion = parseList(getString(formData, 'occasion'));
  const descriptionShort = parseList(getString(formData, 'descriptionShort'));

  const stone = {
    name: getString(formData, 'stoneName'),
    properties: getString(formData, 'stoneProperties'),
    symbolism: getString(formData, 'stoneSymbolism'),
  };

  const description = {
    short: descriptionShort,
    full: getString(formData, 'descriptionFull'),
  };

  return {
    name,
    slug,
    price,
    oldPrice,
    categoryId,
    inStock,
    images,
    tags,
    suitableFor,
    occasion,
    stone,
    description,
    type: getString(formData, 'type') || null,
    isNew: getString(formData, 'isNew') === 'on',
    isPopular: getString(formData, 'isPopular') === 'on',
  };
}

function revalidateProductPaths(slug: string) {
  revalidatePath('/');
  revalidatePath('/catalog');
  revalidatePath('/admin');
  revalidatePath(`/product/${slug}`);
  revalidatePath(`/admin/product/${slug}`);
}

export async function createProduct(formData: FormData) {
  const data = normalizeProductPayload(formData);

  await prisma.product.create({ data });
  revalidateProductPaths(data.slug);
}

export async function updateProduct(formData: FormData) {
  const id = getString(formData, 'id');
  const prevSlug = getString(formData, 'prevSlug');
  const data = normalizeProductPayload(formData);

  await prisma.product.update({
    where: { id },
    data,
  });

  revalidateProductPaths(data.slug);
  if (prevSlug && prevSlug !== data.slug) {
    revalidatePath(`/product/${prevSlug}`);
    revalidatePath(`/admin/product/${prevSlug}`);
  }
}

export async function deleteProduct(id: string) {
  await guardAdminAction();

  await prisma.product.delete({
    where: { id },
  });

  revalidatePath('/admin');
  revalidatePath('/catalog');
  revalidatePath('/');
}

// For all sensitive admin server actions (createProduct, updateProduct, etc.)
// always call guardAdminAction() at the beginning of the action.
