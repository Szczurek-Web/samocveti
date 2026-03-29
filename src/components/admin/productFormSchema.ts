export interface ProductFormValues {
  name: string;
  slug: string;
  price: string;
  description: string;
  categoryId: string;
  isPopular: boolean;
  isNew: boolean;
  image: string;
}

export type ProductFieldErrors = Partial<Record<keyof ProductFormValues, string>>;

export const EMPTY_PRODUCT_FORM: ProductFormValues = {
  name: '',
  slug: '',
  price: '',
  description: '',
  categoryId: '',
  isPopular: false,
  isNew: false,
  image: '',
};

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яё\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function validateProductForm(values: ProductFormValues): ProductFieldErrors {
  const errors: ProductFieldErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Введите название товара';
  }

  if (!values.slug.trim()) {
    errors.slug = 'Введите slug';
  } else if (!/^[a-z0-9а-яё-]+$/i.test(values.slug.trim())) {
    errors.slug = 'Slug может содержать только буквы, цифры и дефис';
  }

  if (!values.price.trim()) {
    errors.price = 'Введите цену';
  } else {
    const parsed = Number(values.price);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      errors.price = 'Цена должна быть положительным числом';
    }
  }

  if (!values.description.trim()) {
    errors.description = 'Введите описание';
  }

  if (!values.categoryId.trim()) {
    errors.categoryId = 'Выберите категорию';
  }

  if (values.image.trim() && !/^https?:\/\//i.test(values.image.trim()) && !values.image.trim().startsWith('/')) {
    errors.image = 'Укажите корректный URL (http/https) или путь /images/...';
  }

  return errors;
}

export function fromFormData(formData: FormData): ProductFormValues {
  return {
    name: String(formData.get('name') ?? '').trim(),
    slug: String(formData.get('slug') ?? '').trim(),
    price: String(formData.get('price') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    categoryId: String(formData.get('categoryId') ?? '').trim(),
    isPopular: formData.get('isPopular') === 'on',
    isNew: formData.get('isNew') === 'on',
    image: String(formData.get('image') ?? '').trim(),
  };
}
