import { create } from 'zustand';

import { TagState } from './tagTypes';

export const useTagStore = create<TagState>((set) => ({
  tags: [],
  setTags: (tags) => set({ tags }),
  addTag: (tag) =>
    set((state) => ({
      tags: [...state.tags, tag],
    })),
}))
