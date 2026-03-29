'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { guardAdminAction } from '@/lib/auth';

function revalidateAll() {
  revalidatePath('/admin');
  revalidatePath('/catalog');
  revalidatePath('/');
}

export async function deleteProduct(id: string) {
  await guardAdminAction();
  await prisma.product.delete({ where: { id } });
  revalidateAll();
  return { success: true };
}

export async function createProduct(formData: FormData) {
  await guardAdminAction();

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const price = parseFloat(formData.get('price') as string);
  const oldPrice = formData.get('oldPrice') ? parseFloat(formData.get('oldPrice') as string) : null;
  const categoryId = formData.get('categoryId') as string;
  const images = (formData.get('images') as string).split('\n').map(s => s.trim()).filter(Boolean);
  const isNew = formData.get('isNew') === 'on';
  const isPopular = formData.get('isPopular') === 'on';
  const type = (formData.get('type') as string) || null;

  const stone = {
    name: formData.get('stoneName') as string || '',
    symbolism: formData.get('stoneSymbolism') as string || '',
    properties: formData.get('stoneProperties') as string || '',
  };

  const description = {
    short: (formData.get('descriptionShort') as string || '').split('\n').filter(Boolean),
    full: formData.get('descriptionFull') as string || '',
  };

  const tags = (formData.get('tags') as string || '').split(',').map(s => s.trim()).filter(Boolean);
  const suitableFor = (formData.get('suitableFor') as string || '').split(',').map(s => s.trim()).filter(Boolean);
  const occasion = (formData.get('occasion') as string || '').split(',').map(s => s.trim()).filter(Boolean);

  await prisma.product.create({
    data: {
      name, slug, price, oldPrice,
      images, categoryId,
      isNew, isPopular, type,
      stone: stone as any,
      description: description as any,
      tags, suitableFor, occasion,
    },
  });

  revalidateAll();
  return { success: true, slug };
}

export async function updateProduct(id: string, formData: FormData) {
  await guardAdminAction();

  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const price = parseFloat(formData.get('price') as string);
  const oldPrice = formData.get('oldPrice') ? parseFloat(formData.get('oldPrice') as string) : null;
  const categoryId = formData.get('categoryId') as string;
  const images = (formData.get('images') as string).split('\n').map(s => s.trim()).filter(Boolean);
  const isNew = formData.get('isNew') === 'on';
  const isPopular = formData.get('isPopular') === 'on';
  const type = (formData.get('type') as string) || null;

  const stone = {
    name: formData.get('stoneName') as string || '',
    symbolism: formData.get('stoneSymbolism') as string || '',
    properties: formData.get('stoneProperties') as string || '',
  };

  const description = {
    short: (formData.get('descriptionShort') as string || '').split('\n').filter(Boolean),
    full: formData.get('descriptionFull') as string || '',
  };

  const tags = (formData.get('tags') as string || '').split(',').map(s => s.trim()).filter(Boolean);
  const suitableFor = (formData.get('suitableFor') as string || '').split(',').map(s => s.trim()).filter(Boolean);
  const occasion = (formData.get('occasion') as string || '').split(',').map(s => s.trim()).filter(Boolean);

  await prisma.product.update({
    where: { id },
    data: {
      name, slug, price, oldPrice,
      images, categoryId,
      isNew, isPopular, type,
      stone: stone as any,
      description: description as any,
      tags, suitableFor, occasion,
    },
  });

  revalidateAll();
  return { success: true, slug };
}
