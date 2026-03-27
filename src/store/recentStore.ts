import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentState {
  recentIds: string[];
  addRecent: (id: string) => void;
}

export const useRecentStore = create<RecentState>()(
  persist(
    (set) => ({
      recentIds: [],

      addRecent: (id) =>
        set((state) => {
          const filtered = state.recentIds.filter((rid) => rid !== id);
          return { recentIds: [id, ...filtered].slice(0, 8) };
        }),
    }),
    {
      name: 'samocveti-recent',
    }
  )
);
