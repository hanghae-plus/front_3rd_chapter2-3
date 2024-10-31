import { FilterAction, FilterState } from '@entities/comment/model/types'
import { create } from 'zustand'

export const filterStore = create<FilterState & FilterAction>((set, get) => ({
  sortBy: '',
  sortOrder: 'asc',
  limit: 10,
  skip: 0,
  searchQuery: '',
  selectedTag: '',

  // 액션
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setLimit: (limit) => set({ limit }),
  setSkip: (skip) => set({ skip }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedTag: (selectedTag) => set({ selectedTag }),

  updateURL: (navigate) => {
    const state = get()
    const params = new URLSearchParams()

    if (state.skip) params.set('skip', state.skip.toString())
    if (state.limit) params.set('limit', state.limit.toString())
    if (state.searchQuery) params.set('search', state.searchQuery)
    if (state.sortBy) params.set('sortBy', state.sortBy)
    if (state.sortOrder) params.set('sortOrder', state.sortOrder)
    if (state.selectedTag) params.set('tag', state.selectedTag)

    navigate(`?${params.toString()}`)
  },
}))
