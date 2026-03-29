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

// Auto-slug generator utility
function slugify(text: string) {
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
    з: 'z', и: 'i', й: 'j', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
    п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'c',
    ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya'
  };
  return text.toLowerCase()
    .split('')
    .map(char => map[char] || char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function Section({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-6 hover-lift" style={{ background: 'var(--color-bg-card)', borderColor: 'var(--color-border)' }}>
      <div className="flex items-center gap-3 mb-5 pb-3" style={{ borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="w-8 h-8 rounded-lg flex flex-shrink-0 items-center justify-center text-lg shadow-sm" style={{ background: 'var(--color-bg-hover)' }}>{icon}</div>
        <h3 className="font-semibold" style={{ color: 'var(--color-text)' }}>{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function Field({ label, name, defaultValue, type = 'text', required = false, append }: any) {
  return (
    <label className="block w-full">
      <span className="mb-1.5 block text-[13px] font-medium text-gray-400">{label} {required && <span className="text-red-500">*</span>}</span>
      <div className="relative flex items-center">
        <input
          name={name}
          defaultValue={defaultValue}
          type={type}
          required={required}
          className="w-full rounded-xl border px-4 py-2.5 outline-none transition-colors"
          style={{ background: 'var(--color-bg-hover)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        />
        {append && <div className="absolute right-2">{append}</div>}
      </div>
    </label>
  );
}

export default function ProductForm({ mode, submitAction, categories, values }: ProductFormProps) {
  const handleGenerateSlug = () => {
    const nameInput = document.querySelector<HTMLInputElement>('input[name="name"]');
    const slugInput = document.querySelector<HTMLInputElement>('input[name="slug"]');
    if (nameInput && slugInput && nameInput.value) {
      slugInput.value = slugify(nameInput.value);
    }
  };

  return (
    <form action={async (formData) => { await submitAction(formData); }} className="space-y-6 max-w-5xl mx-auto">
      {mode === 'edit' && values.id && <input type="hidden" name="id" value={values.id} />}
      {mode === 'edit' && <input type="hidden" name="prevSlug" value={values.slug} />}

      {/* Top sticky bar for actions */}
      <div className="sticky top-[72px] z-40 flex items-center justify-between p-4 rounded-2xl mb-6 shadow-xl" 
           style={{ background: 'rgba(20,20,20,0.85)', backdropFilter: 'blur(12px)', border: '1px solid var(--color-border-light)' }}>
        <div className="flex gap-4 items-center">
          <Link href="/admin" className="text-sm font-medium hover:text-white transition-colors" style={{ color: 'var(--color-text-muted)' }}>
            ← Назад к списку
          </Link>
          <span className="text-gray-500 hidden md:inline">|</span>
          <div className="flex gap-4">
            <label className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer" style={{ color: 'var(--color-text-secondary)' }}>
              <input type="checkbox" name="isNew" defaultChecked={values.isNew} className="accent-amber-500 w-4 h-4" />
              Новинка ✨
            </label>
            <label className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer" style={{ color: 'var(--color-text-secondary)' }}>
              <input type="checkbox" name="isPopular" defaultChecked={values.isPopular} className="accent-red-500 w-4 h-4" />
              Популярное 🔥
            </label>
          </div>
        </div>
        <button type="submit" className="btn-primary py-2.5 px-6 shadow-[0_0_20px_rgba(212,168,83,0.3)]">
          {mode === 'new' ? '+ Добавить товар' : 'Сохранить изменения'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Section title="Основная информация" icon="💎">
            <Field label="Наименование" name="name" defaultValue={values.name} required />
            <div className="grid grid-cols-2 gap-4">
              <Field 
                label="URL (Slug)" 
                name="slug" 
                defaultValue={values.slug} 
                required 
                append={(
                  <button type="button" onClick={handleGenerateSlug} title="Сгенерировать из названия"
                          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2a2a2a] hover:bg-[#333] transition-colors text-amber-500">
                    ♻️
                  </button>
                )} 
              />
              <Field label="Тип изделия (Браслет, Серьги и т.д.)" name="type" defaultValue={values.type} />
            </div>
            
            <label className="block mt-4">
              <span className="mb-1.5 block text-[13px] font-medium text-gray-400">Краткое описание (выводится в списке свойств)</span>
              <textarea
                name="descriptionShort"
                defaultValue={values.descriptionShort}
                rows={3}
                placeholder="Например: &#10;- Защита от сглаза&#10;- Привлекает любовь"
                className="w-full rounded-xl border px-4 py-3 outline-none transition-colors"
                style={{ background: 'var(--color-bg-hover)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              />
            </label>
            <label className="block mt-2">
              <span className="mb-1.5 block text-[13px] font-medium text-gray-400">Маркетинговое описание</span>
              <textarea
                name="descriptionFull"
                defaultValue={values.descriptionFull}
                rows={5}
                required
                className="w-full rounded-xl border px-4 py-3 outline-none transition-colors"
                style={{ background: 'var(--color-bg-hover)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              />
            </label>
          </Section>

          <Section title="Свойства камня" icon="🔮">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Название камня" name="stoneName" defaultValue={values.stoneName} required />
              <Field label="Магические свойства (кратко)" name="stoneProperties" defaultValue={values.stoneProperties} required />
            </div>
            <label className="block mt-4">
              <span className="mb-1.5 block text-[13px] font-medium text-gray-400">Символизм (Что означает + Кому дарить)</span>
              <textarea
                name="stoneSymbolism"
                defaultValue={values.stoneSymbolism}
                rows={3}
                required
                className="w-full rounded-xl border px-4 py-3 outline-none transition-colors"
                style={{ background: 'var(--color-bg-hover)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              />
            </label>
          </Section>

          <Section title="Медиа и Изображения" icon="📸">
             <label className="block">
              <span className="mb-1.5 block text-[13px] font-medium text-gray-400">URL изображений (каждое с новой строки)</span>
              <div className="text-xs text-blue-400 mb-2 p-2 rounded bg-blue-500/10">ℹ️ Пока поддерживается только вставка прямых ссылок (например, https://example.com/img.jpg)</div>
              <textarea
                name="images"
                defaultValue={values.images}
                rows={4}
                required
                placeholder="https://..."
                className="w-full rounded-xl border px-4 py-3 outline-none transition-colors font-mono text-sm"
                style={{ background: 'var(--color-bg-hover)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              />
            </label>
          </Section>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Section title="Цены" icon="💰">
            <Field label="Текущая цена (BYN)" name="price" type="number" defaultValue={values.price} required />
            <div className="mt-4">
              <Field label="Старая цена (BYN, если скидка)" name="oldPrice" type="number" defaultValue={values.oldPrice} />
            </div>
          </Section>
          
          <Section title="Инвентарь" icon="📦">
            <Field label="Остаток на складе" name="inStock" type="number" defaultValue={values.inStock} required />
            
            <label className="block mt-4">
              <span className="mb-1.5 block text-[13px] font-medium text-gray-400">Категория *</span>
              <select
                name="categoryId"
                defaultValue={values.categoryId}
                required
                className="w-full rounded-xl border px-4 py-3 outline-none transition-colors appearance-none"
                style={{ background: 'var(--color-bg-hover)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-border)')}
              >
                <option value="" disabled>не выбрана</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
          </Section>

          <Section title="Теги и Навигация" icon="🏷">
            <Field label="Теги (через запятую)" name="tags" defaultValue={values.tags} />
            <div className="mt-4">
              <Field label="Кому (Мужчине, Женщине)" name="suitableFor" defaultValue={values.suitableFor} />
            </div>
            <div className="mt-4">
              <Field label="Повод (ДР, 8 марта)" name="occasion" defaultValue={values.occasion} />
            </div>
          </Section>
        </div>
      </div>
    </form>
  );
}
