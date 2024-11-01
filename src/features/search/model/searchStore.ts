import { create } from "zustand"

type SearchStore = {
  skip: string
  setSkip: (skip: string) => void

  limit: string
  setLimit: (limit: string) => void

  searchQuery: string
  setSearchQuery: (searchQuery: string) => void

  sortBy: string
  setSortBy: (sortBy: string) => void

  sortOrder: string
  setSortOrder: (sortOrder: string) => void

  selectedTag: string
  setSelectedTag: (selectedTag: string) => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  skip: "",
  setSkip: (skip: string) => set({ skip }),

  limit: "",
  setLimit: (limit: string) => set({ limit }),

  searchQuery: "",
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),

  sortBy: "",
  setSortBy: (sortBy: string) => set({ sortBy }),

  sortOrder: "",
  setSortOrder: (sortOrder: string) => set({ sortOrder }),
  
  selectedTag: "",
  setSelectedTag: (selectedTag: string) => set({ selectedTag }),
}))
