import { create } from 'zustand';

interface RecentState {
  recentIds: string[];
  addRecent: (id: string) => void;
}

export const useRecentStore = create<RecentState>((set) => ({
  recentIds:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('samocveti-recent') || '[]')
      : [],

  addRecent: (id) =>
    set((state) => {
      const filtered = state.recentIds.filter((rid) => rid !== id);
      const next = [id, ...filtered].slice(0, 8);
      if (typeof window !== 'undefined') {
        localStorage.setItem('samocveti-recent', JSON.stringify(next));
      }
      return { recentIds: next };
    }),
}));
