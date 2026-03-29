'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id },
  });
  
  revalidatePath('/admin');
  revalidatePath('/catalog');
  revalidatePath('/');
}
