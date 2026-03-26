import { create } from 'zustand';

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('samocveti-favorites') || '[]')
      : [],

  toggleFavorite: (id) =>
    set((state) => {
      const next = state.favorites.includes(id)
        ? state.favorites.filter((fid) => fid !== id)
        : [...state.favorites, id];
      if (typeof window !== 'undefined') {
        localStorage.setItem('samocveti-favorites', JSON.stringify(next));
      }
      return { favorites: next };
    }),

  isFavorite: (id) => get().favorites.includes(id),

  clearFavorites: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('samocveti-favorites');
    }
    set({ favorites: [] });
  },
}));
