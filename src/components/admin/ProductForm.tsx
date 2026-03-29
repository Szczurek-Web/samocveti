'use client';

import { useActionState, useEffect, useMemo, useState } from 'react';
import { useToastStore } from '@/store/toastStore';
import {
  EMPTY_PRODUCT_FORM,
  ProductFieldErrors,
  ProductFormValues,
  slugify,
  validateProductForm,
} from './productFormSchema';
import { initialProductFormState, ProductFormState } from '@/app/admin/product/actions';

interface CategoryOption {
  id: string;
  name: string;
}

interface ProductFormProps {
  mode: 'create' | 'edit';
  categories: CategoryOption[];
  submitLabel?: string;
  initialValues?: ProductFormValues;
  action: (state: ProductFormState, formData: FormData) => Promise<ProductFormState>;
}

export default function ProductForm({
  mode,
  categories,
  submitLabel = 'Сохранить',
  initialValues = EMPTY_PRODUCT_FORM,
  action,
}: ProductFormProps) {
  const [state, formAction, pending] = useActionState(action, {
    ...initialProductFormState,
    values: initialValues,
  });

  const addToast = useToastStore((s) => s.addToast);

  const [values, setValues] = useState<ProductFormValues>(initialValues);
  const [clientErrors, setClientErrors] = useState<ProductFieldErrors>({});
  const [slugTouched, setSlugTouched] = useState(Boolean(initialValues.slug));

  useEffect(() => {
    if (state.status === 'success') {
      addToast('Сохранено', 'success');
      return;
    }

    if (state.status === 'error') {
      addToast(state.message || 'Ошибка сохранения', 'error');
    }
  }, [state.status, state.message, addToast]);

  const serverErrors = state.fieldErrors;
  const errors = useMemo(() => ({ ...serverErrors, ...clientErrors }), [serverErrors, clientErrors]);

  const setField = <K extends keyof ProductFormValues>(key: K, next: ProductFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: next }));
    setClientErrors((prev) => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const onNameChange = (name: string) => {
    setField('name', name);
    if (!slugTouched) {
      setField('slug', slugify(name));
    }
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    const form = event.currentTarget;
    const nextValues: ProductFormValues = {
      name: String(new FormData(form).get('name') ?? ''),
      slug: String(new FormData(form).get('slug') ?? ''),
      price: String(new FormData(form).get('price') ?? ''),
      description: String(new FormData(form).get('description') ?? ''),
      categoryId: String(new FormData(form).get('categoryId') ?? ''),
      isPopular: new FormData(form).get('isPopular') === 'on',
      isNew: new FormData(form).get('isNew') === 'on',
      image: String(new FormData(form).get('image') ?? ''),
    };

    nextValues.slug = slugify(nextValues.slug || nextValues.name);
    setValues(nextValues);

    const nextErrors = validateProductForm(nextValues);
    setClientErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      event.preventDefault();
      addToast('Заполните обязательные поля', 'error');
    }
  };

  return (
    <form action={formAction} onSubmit={onSubmit} className="space-y-6 rounded-xl border border-gray-800 bg-[#121212] p-6">
      <h1 className="text-2xl font-bold font-serif" style={{ color: 'var(--color-gold)' }}>
        {mode === 'create' ? 'Новый товар' : 'Редактирование товара'}
      </h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span>Название *</span>
          <input
            name="name"
            value={values.name}
            disabled={pending}
            onChange={(e) => onNameChange(e.target.value)}
            className="rounded-md border border-gray-700 bg-[#0b0b0b] px-3 py-2"
          />
          {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span>Slug *</span>
          <input
            name="slug"
            value={values.slug}
            disabled={pending}
            onChange={(e) => {
              setSlugTouched(true);
              setField('slug', slugify(e.target.value));
            }}
            className="rounded-md border border-gray-700 bg-[#0b0b0b] px-3 py-2"
          />
          <span className="text-xs text-gray-500">Автогенерация из названия до ручного изменения</span>
          {errors.slug && <span className="text-xs text-red-400">{errors.slug}</span>}
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span>Цена *</span>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={values.price}
            disabled={pending}
            onChange={(e) => setField('price', e.target.value)}
            className="rounded-md border border-gray-700 bg-[#0b0b0b] px-3 py-2"
          />
          {errors.price && <span className="text-xs text-red-400">{errors.price}</span>}
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span>Категория *</span>
          <select
            name="categoryId"
            value={values.categoryId}
            disabled={pending}
            onChange={(e) => setField('categoryId', e.target.value)}
            className="rounded-md border border-gray-700 bg-[#0b0b0b] px-3 py-2"
          >
            <option value="">Выберите категорию</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <span className="text-xs text-red-400">{errors.categoryId}</span>}
        </label>
      </div>

      <label className="flex flex-col gap-2 text-sm">
        <span>Описание *</span>
        <textarea
          name="description"
          rows={5}
          value={values.description}
          disabled={pending}
          onChange={(e) => setField('description', e.target.value)}
          className="rounded-md border border-gray-700 bg-[#0b0b0b] px-3 py-2"
        />
        {errors.description && <span className="text-xs text-red-400">{errors.description}</span>}
      </label>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span>Изображение (URL или путь)</span>
          <input
            name="image"
            value={values.image}
            disabled={pending}
            onChange={(e) => setField('image', e.target.value)}
            placeholder="https://... или /images/product-1.png"
            className="rounded-md border border-gray-700 bg-[#0b0b0b] px-3 py-2"
          />
          {errors.image && <span className="text-xs text-red-400">{errors.image}</span>}
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span>Upload (stub)</span>
          <input type="file" disabled className="cursor-not-allowed rounded-md border border-dashed border-gray-700 bg-[#0b0b0b] px-3 py-2 text-gray-500" />
          <span className="text-xs text-gray-500">Заглушка: upload будет добавлен отдельно</span>
        </label>
      </div>

      <div className="flex flex-wrap gap-6 text-sm">
        <label className="inline-flex items-center gap-2">
          <input
            name="isPopular"
            type="checkbox"
            checked={values.isPopular}
            disabled={pending}
            onChange={(e) => setField('isPopular', e.target.checked)}
          />
          Популярный товар
        </label>
        <label className="inline-flex items-center gap-2">
          <input
            name="isNew"
            type="checkbox"
            checked={values.isNew}
            disabled={pending}
            onChange={(e) => setField('isNew', e.target.checked)}
          />
          Новинка
        </label>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-amber-600 px-5 py-2.5 font-semibold text-black transition hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Сохранение...' : submitLabel}
      </button>
    </form>
  );
}
