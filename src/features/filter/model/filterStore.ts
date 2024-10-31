import { create } from 'zustand';

import { PostFilterState } from './filterTypes';

export const usePostFilterStore = create<PostFilterState>((set) => ({
  tagFilter: "",
  sortField: "id",
  sortOrder: "desc",

  setTagFilter: (tag) => set({ tagFilter: tag }),
  setSortField: (field) => set({ sortField: field }),
  setSortOrder: (order) => set({ sortOrder: order }),
}))
