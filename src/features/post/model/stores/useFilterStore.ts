import { create } from 'zustand'

interface FilterState {
  sortBy: string
  sortOrder: 'asc' | 'desc'
  limit: number
  skip: number
  searchQuery: string
  selectedTag: string
}

interface FilterAction {
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: 'asc' | 'desc') => void
  setLimit: (limit: number) => void
  setSkip: (skip: number) => void
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  initializeFromURL: (searchParams: URLSearchParams) => void
  updateURL: (navigate: (path: string) => void) => void
}

export const useFilterStore = create<FilterState & FilterAction>((set, get) => ({
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
  initializeFromURL: (searchParams) => {
    set({
      sortBy: searchParams.get('sortBy') || '',
      sortOrder: (searchParams.get('sortOrder') || 'asc') as 'asc' | 'desc',
      limit: parseInt(searchParams.get('limit') || '10'),
      skip: parseInt(searchParams.get('skip') || '0'),
      searchQuery: searchParams.get('search') || '',
      selectedTag: searchParams.get('tag') || '',
    })
  },

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
