import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
import { TagSlugType } from "../../../entities/tag/api/types"

type LimitType = 10 | 20 | 30 | number
type SortByType = "none" | "id" | "title" | "react"
type SortOrderType = "desc" | "asc"
export type SelectTagType = TagSlugType | "all"

interface TableStoreType {
  searchQuery: string
  limit: LimitType
  sortBy: SortByType
  sortOrder: SortOrderType
  selectedTag: SelectTagType
  setSearchQuery: (searchQuery: string) => void
  setLimit: (newLimit: LimitType) => void
  setSortBy: (newSortBy: SortByType) => void
  setSortOrder: (newSortOrder: SortOrderType) => void
  setSelectedTag: (newTag: SelectTagType) => void
}

const useTableStore = create<TableStoreType>()(
  devtools(
    persist(
      (set) => ({
        searchQuery: "",
        limit: 10,
        sortBy: "none",
        sortOrder: "desc",
        selectedTag: "all",
        setSearchQuery: (searchQuery) => set({ searchQuery: searchQuery }),
        setLimit: (newLimit) => set({ limit: newLimit }),
        setSortBy: (newSortBy) => set({ sortBy: newSortBy }),
        setSortOrder: (newSortOrder) => set({ sortOrder: newSortOrder }),
        setSelectedTag: (newTag) => set({ selectedTag: newTag }),
      }),
      { name: "tableStore" },
    ),
  ),
)

export default useTableStore
