import { useState } from "react"
import { PostFiltersState } from "./types"

export const usePostFilters = (initialState?: Partial<PostFiltersState>) => {
  const [filters, setFilters] = useState<PostFiltersState>({
    sortBy: "",
    sortOrder: "asc",
    selectedTag: "",
    limit: 10,
    skip: 0,
    ...initialState,
  })

  return {
    filters,
    setFilters,
    updateFilter: <K extends keyof PostFiltersState>(key: K, value: PostFiltersState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }))
    },
  }
}
