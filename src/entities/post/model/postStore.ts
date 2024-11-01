import { create } from "zustand"
import { persist } from "zustand/middleware"

interface PostFilterState {
  skip: number
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: string
  selectedTag: string
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: string) => void
  setSelectedTag: (tag: string) => void
}

export const usePostStore = create<PostFilterState>()(
  persist(
    (set) => ({
      skip: 0,
      limit: 10,
      searchQuery: "",
      sortBy: "",
      sortOrder: "asc",
      selectedTag: "",
      setSkip: (skip) => set({ skip }),
      setLimit: (limit) => set({ limit }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (order) => set({ sortOrder: order }),
      setSelectedTag: (tag) => set({ selectedTag: tag }),
    }),
    {
      name: "post-filter-storage",
    },
  ),
)
