'use client';

import Link from 'next/link';

type ProductFormValues = {
  id?: string;
  name: string;
  slug: string;
  price: string;
  oldPrice: string;
  images: string;
  categoryId: string;
  inStock: string;
  stoneName: string;
  stoneProperties: string;
  stoneSymbolism: string;
  descriptionShort: string;
  descriptionFull: string;
  tags: string;
  suitableFor: string;
  occasion: string;
  type: string;
  isNew: boolean;
  isPopular: boolean;
};

type CategoryOption = {
  id: string;
  name: string;
};

type ProductFormProps = {
  mode: 'new' | 'edit';
  submitAction: (formData: FormData) => Promise<void | { slug: string }>;
  categories: CategoryOption[];
  values: ProductFormValues;
};

function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  required = false,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-gray-300">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        type={type}
        required={required}
        className="w-full rounded-lg border border-gray-700 bg-[#111] px-3 py-2 text-white outline-none focus:border-amber-500"
      />
    </label>
  );
}

export default function ProductForm({ mode, submitAction, categories, values }: ProductFormProps) {
  return (
    <form action={async (formData) => { await submitAction(formData); }} className="space-y-6 rounded-xl border border-gray-800 bg-[#121212] p-6">
      {mode === 'edit' && values.id && <input type="hidden" name="id" value={values.id} />}
      {mode === 'edit' && <input type="hidden" name="prevSlug" value={values.slug} />}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Название" name="name" defaultValue={values.name} required />
        <Field label="Slug" name="slug" defaultValue={values.slug} required />
        <Field label="Цена" name="price" type="number" defaultValue={values.price} required />
        <Field label="Старая цена" name="oldPrice" type="number" defaultValue={values.oldPrice} />
        <Field label="Остаток" name="inStock" type="number" defaultValue={values.inStock} required />
        <Field label="Тип" name="type" defaultValue={values.type} />
      </div>

      <label className="block">
        <span className="mb-2 block text-sm text-gray-300">Категория</span>
        <select
          name="categoryId"
          defaultValue={values.categoryId}
          required
          className="w-full rounded-lg border border-gray-700 bg-[#111] px-3 py-2 text-white outline-none focus:border-amber-500"
        >
          <option value="" disabled>
            Выберите категорию
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm text-gray-300">Изображения (через запятую или с новой строки)</span>
        <textarea
          name="images"
          defaultValue={values.images}
          rows={3}
          required
          className="w-full rounded-lg border border-gray-700 bg-[#111] px-3 py-2 text-white outline-none focus:border-amber-500"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Камень: название" name="stoneName" defaultValue={values.stoneName} required />
        <Field label="Камень: свойства" name="stoneProperties" defaultValue={values.stoneProperties} required />
        <Field label="Камень: символизм" name="stoneSymbolism" defaultValue={values.stoneSymbolism} required />
      </div>

      <label className="block">
        <span className="mb-2 block text-sm text-gray-300">Краткое описание (список)</span>
        <textarea
          name="descriptionShort"
          defaultValue={values.descriptionShort}
          rows={4}
          className="w-full rounded-lg border border-gray-700 bg-[#111] px-3 py-2 text-white outline-none focus:border-amber-500"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm text-gray-300">Полное описание</span>
        <textarea
          name="descriptionFull"
          defaultValue={values.descriptionFull}
          rows={4}
          className="w-full rounded-lg border border-gray-700 bg-[#111] px-3 py-2 text-white outline-none focus:border-amber-500"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Теги" name="tags" defaultValue={values.tags} />
        <Field label="Кому подходит" name="suitableFor" defaultValue={values.suitableFor} />
        <Field label="Повод" name="occasion" defaultValue={values.occasion} />
      </div>

      <div className="flex gap-6">
        <label className="inline-flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" name="isNew" defaultChecked={values.isNew} />
          Новинка
        </label>
        <label className="inline-flex items-center gap-2 text-sm text-gray-300">
          <input type="checkbox" name="isPopular" defaultChecked={values.isPopular} />
          Популярное
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="rounded-lg bg-amber-600 px-5 py-2 font-semibold text-black transition hover:bg-amber-500"
        >
          {mode === 'new' ? 'Создать товар' : 'Сохранить изменения'}
        </button>
        <Link href="/admin" className="text-gray-400 transition hover:text-white">
          Отмена
        </Link>
      </div>
    </form>
  );
}
