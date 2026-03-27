'use client';

import { useCallback, useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import { useToastStore } from '@/store/toastStore';

interface ProductInfo {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function useProductActions() {
  const addItem = useCartStore((s) => s.addItem);
  const { toggleFavorite, isFavorite } = useFavoritesStore();
  const addToast = useToastStore((s) => s.addToast);
  const [addedToCartId, setAddedToCartId] = useState<string | null>(null);

  const handleAddToCart = useCallback(
    (product: ProductInfo) => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      addToast('Добавлено в корзину');
      setAddedToCartId(product.id);
      setTimeout(() => setAddedToCartId(null), 2000);
    },
    [addItem, addToast]
  );

  const handleToggleFavorite = useCallback(
    (id: string) => {
      const wasFav = isFavorite(id);
      toggleFavorite(id);
      addToast(wasFav ? 'Удалено из избранного' : 'Добавлено в избранное');
    },
    [toggleFavorite, isFavorite, addToast]
  );

  return {
    handleAddToCart,
    handleToggleFavorite,
    isFavorite,
    isAddedToCart: (id: string) => addedToCartId === id,
  };
}
