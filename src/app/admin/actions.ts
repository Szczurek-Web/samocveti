'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { requireAdminSession } from '@/lib/admin-auth';

async function guardAdminAction() {
  await requireAdminSession({ onFail: 'throw' });
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
