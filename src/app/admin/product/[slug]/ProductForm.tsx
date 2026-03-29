'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '../../actions';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface ProductData {
  id: string;
  name: string;
  slug: string;
  price: number;
  oldPrice: number | null;
  images: string[];
  categoryId: string;
  isNew: boolean;
  isPopular: boolean;
  type: string | null;
  stone: { name: string; symbolism: string; properties: string };
  description: { short: string[]; full: string };
  tags: string[];
  suitableFor: string[];
  occasion: string[];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ёЁ]/g, 'e')
    .replace(/[а-яА-Я]/g, (c) => {
      const map: Record<string, string> = {
        'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ж':'zh','з':'z','и':'i','й':'j',
        'к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u',
        'ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
      };
      return map[c.toLowerCase()] || c;
    })
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const inputCls = "w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-colors";
const inputStyle = {
  background: '#18181b',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#fafafa',
};
const labelCls = "block text-xs font-medium mb-1.5";
const labelStyle = { color: '#a1a1aa' };

export default function ProductForm({
  product,
  categories,
}: {
  product: ProductData | null;
  categories: Category[];
}) {
  const router = useRouter();
  const isEdit = !!product;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [autoSlug, setAutoSlug] = useState(!isEdit);

  const [name, setName] = useState(product?.name || '');
  const [slug, setSlug] = useState(product?.slug || '');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (autoSlug) setSlug(slugify(val));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);

    try {
      if (isEdit) {
        await updateProduct(product!.id, formData);
        showToast('Товар обновлён');
      } else {
        const result = await createProduct(formData);
        showToast('Товар создан');
        if (result?.slug) {
          router.push('/admin');
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Ошибка сохранения');
    }
    setLoading(false);
  };

  const stone = product?.stone || { name: '', symbolism: '', properties: '' };
  const desc = product?.description || { short: [], full: '' };

  return (
    <>
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg text-sm font-medium"
          style={{ background: '#18181b', border: '1px solid rgba(255,255,255,0.1)', color: '#fafafa' }}
        >
          ✓ {toast}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-3xl">
        {/* Basic Info */}
        <div className="p-6 rounded-xl" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-sm font-semibold mb-5" style={{ color: '#d4a853' }}>Основное</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelCls} style={labelStyle}>Название *</label>
              <input
                name="name" value={name} onChange={(e) => handleNameChange(e.target.value)}
                className={inputCls} style={inputStyle} required placeholder="Браслет из тигрового глаза"
              />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>
                Slug *
                {!isEdit && (
                  <button
                    type="button"
                    onClick={() => setAutoSlug(!autoSlug)}
                    className="ml-2 text-[10px] px-1.5 py-0.5 rounded border-none cursor-pointer"
                    style={{ background: autoSlug ? 'rgba(212,168,83,0.15)' : 'rgba(255,255,255,0.05)', color: autoSlug ? '#d4a853' : '#71717a' }}
                  >
                    {autoSlug ? 'auto' : 'manual'}
                  </button>
                )}
              </label>
              <input
                name="slug" value={slug} onChange={(e) => { setSlug(e.target.value); setAutoSlug(false); }}
                className={inputCls} style={inputStyle} required placeholder="braslet-iz-tigrovogo-glaza"
              />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Цена (BYN) *</label>
              <input
                name="price" type="number" step="0.01" defaultValue={product?.price || ''}
                className={inputCls} style={inputStyle} required placeholder="65"
              />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Старая цена</label>
              <input
                name="oldPrice" type="number" step="0.01" defaultValue={product?.oldPrice || ''}
                className={inputCls} style={inputStyle} placeholder="85"
              />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Категория *</label>
              <select
                name="categoryId" defaultValue={product?.categoryId || ''}
                className={inputCls} style={{ ...inputStyle, cursor: 'pointer' }} required
              >
                <option value="">Выберите...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Тип</label>
              <input
                name="type" defaultValue={product?.type || ''}
                className={inputCls} style={inputStyle} placeholder="bracelet, painting..."
              />
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#a1a1aa' }}>
              <input type="checkbox" name="isNew" defaultChecked={product?.isNew} className="accent-amber-500" />
              ✨ Новинка
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#a1a1aa' }}>
              <input type="checkbox" name="isPopular" defaultChecked={product?.isPopular} className="accent-amber-500" />
              🔥 Популярный
            </label>
          </div>
        </div>

        {/* Images */}
        <div className="p-6 rounded-xl" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#d4a853' }}>Изображения</h3>
          <label className={labelCls} style={labelStyle}>URL изображений (по одному на строку)</label>
          <textarea
            name="images" defaultValue={product?.images.join('\n') || ''}
            className={inputCls + ' resize-none'} style={{ ...inputStyle, minHeight: '100px' }}
            placeholder={"/images/product1.jpg\n/images/product1-2.jpg\nhttps://example.com/photo.png"}
          />
          <p className="text-[11px] mt-2" style={{ color: '#3f3f46' }}>
            Поддерживаются локальные пути (/images/...) и внешние URL
          </p>
        </div>

        {/* Stone */}
        <div className="p-6 rounded-xl" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#d4a853' }}>Камень</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={labelCls} style={labelStyle}>Название камня</label>
              <input name="stoneName" defaultValue={stone.name} className={inputCls} style={inputStyle} placeholder="Тигровый глаз" />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Символика</label>
              <textarea name="stoneSymbolism" defaultValue={stone.symbolism} className={inputCls + ' resize-none'} style={{ ...inputStyle, minHeight: '60px' }} />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Свойства</label>
              <textarea name="stoneProperties" defaultValue={stone.properties} className={inputCls + ' resize-none'} style={{ ...inputStyle, minHeight: '60px' }} />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-6 rounded-xl" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#d4a853' }}>Описание</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className={labelCls} style={labelStyle}>Краткие характеристики (по строке)</label>
              <textarea
                name="descriptionShort" defaultValue={desc.short.join('\n')}
                className={inputCls + ' resize-none'} style={{ ...inputStyle, minHeight: '80px' }}
                placeholder={"Натуральный тигровый глаз\nДиаметр бусин: 8 мм\nРучная работа"}
              />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Полное описание</label>
              <textarea
                name="descriptionFull" defaultValue={desc.full}
                className={inputCls + ' resize-none'} style={{ ...inputStyle, minHeight: '100px' }}
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="p-6 rounded-xl" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#d4a853' }}>Метки</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelCls} style={labelStyle}>Теги (через запятую)</label>
              <input name="tags" defaultValue={product?.tags.join(', ')} className={inputCls} style={inputStyle} placeholder="подарок, браслет" />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Кому подходит</label>
              <input name="suitableFor" defaultValue={product?.suitableFor.join(', ')} className={inputCls} style={inputStyle} placeholder="Мужчине, Женщине" />
            </div>
            <div>
              <label className={labelCls} style={labelStyle}>Повод</label>
              <input name="occasion" defaultValue={product?.occasion.join(', ')} className={inputCls} style={inputStyle} placeholder="День рождения, 8 марта" />
            </div>
          </div>
        </div>

        {/* Submit */}
        {error && <p className="text-sm" style={{ color: '#ef4444' }}>⚠ {error}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-lg text-sm font-semibold border-none cursor-pointer transition-opacity"
            style={{ background: '#d4a853', color: '#09090b', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? '⏳ Сохранение...' : isEdit ? '✓ Сохранить изменения' : '+ Создать товар'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin')}
            className="px-6 py-3 rounded-lg text-sm border-none cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.05)', color: '#a1a1aa' }}
          >
            Отмена
          </button>
        </div>
      </form>
    </>
  );
}
