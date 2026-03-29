'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import {
  EMPTY_PRODUCT_FORM,
  ProductFieldErrors,
  ProductFormValues,
  fromFormData,
  slugify,
  validateProductForm,
} from '@/components/admin/productFormSchema';

export interface ProductFormState {
  status: 'idle' | 'success' | 'error';
  message: string;
  fieldErrors: ProductFieldErrors;
  values: ProductFormValues;
}

export const initialProductFormState: ProductFormState = {
  status: 'idle',
  message: '',
  fieldErrors: {},
  values: EMPTY_PRODUCT_FORM,
};

function errorState(message: string, values: ProductFormValues, fieldErrors: ProductFieldErrors = {}): ProductFormState {
  return {
    status: 'error',
    message,
    fieldErrors,
    values,
  };
}

export async function createProductAction(_: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const values = fromFormData(formData);
  values.slug = slugify(values.slug || values.name);

  const fieldErrors = validateProductForm(values);
  if (Object.keys(fieldErrors).length > 0) {
    return errorState('Проверьте корректность полей', values, fieldErrors);
  }

  const existing = await prisma.product.findUnique({ where: { slug: values.slug } });
  if (existing) {
    return errorState('Не удалось сохранить товар', values, { slug: 'Товар с таким slug уже существует' });
  }

  try {
    await prisma.product.create({
      data: {
        name: values.name,
        slug: values.slug,
        price: Number(values.price),
        categoryId: values.categoryId,
        isPopular: values.isPopular,
        isNew: values.isNew,
        images: [values.image || '/images/product-1.png'],
        description: {
          short: [values.description],
          full: values.description,
        },
        stone: {
          name: 'Натуральный камень',
          symbolism: 'Уникальное изделие из камня ручной работы',
        },
        tags: [],
        suitableFor: [],
        occasion: [],
      },
    });
  } catch {
    return errorState('Не удалось сохранить товар', values);
  }

  revalidatePath('/admin');
  revalidatePath('/catalog');
  revalidatePath('/');

  return {
    status: 'success',
    message: 'Товар сохранён',
    fieldErrors: {},
    values,
  };
}

export async function updateProductAction(
  productId: string,
  _: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const values = fromFormData(formData);
  values.slug = slugify(values.slug || values.name);

  const fieldErrors = validateProductForm(values);
  if (Object.keys(fieldErrors).length > 0) {
    return errorState('Проверьте корректность полей', values, fieldErrors);
  }

  const duplicateSlug = await prisma.product.findFirst({
    where: {
      slug: values.slug,
      NOT: { id: productId },
    },
  });

  if (duplicateSlug) {
    return errorState('Не удалось сохранить товар', values, { slug: 'Товар с таким slug уже существует' });
  }

  try {
    const current = await prisma.product.findUnique({ where: { id: productId } });

    if (!current) {
      return errorState('Товар не найден', values);
    }

    await prisma.product.update({
      where: { id: productId },
      data: {
        name: values.name,
        slug: values.slug,
        price: Number(values.price),
        categoryId: values.categoryId,
        isPopular: values.isPopular,
        isNew: values.isNew,
        images: [values.image || current.images[0] || '/images/product-1.png'],
        description: {
          short: [values.description],
          full: values.description,
        },
      },
    });
  } catch {
    return errorState('Не удалось сохранить товар', values);
  }

  revalidatePath('/admin');
  revalidatePath(`/admin/product/${values.slug}`);
  revalidatePath('/catalog');
  revalidatePath(`/product/${values.slug}`);
  revalidatePath('/');

  return {
    status: 'success',
    message: 'Товар сохранён',
    fieldErrors: {},
    values,
  };
}
