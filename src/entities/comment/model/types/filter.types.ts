export interface FilterState {
  sortBy: string
  sortOrder: 'asc' | 'desc'
  limit: number
  skip: number
  searchQuery: string
  selectedTag: string
}

export interface FilterAction {
  setSortBy: (sortBy: string) => void
  setSortOrder: (sortOrder: 'asc' | 'desc') => void
  setLimit: (limit: number) => void
  setSkip: (skip: number) => void
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  updateURL: (navigate: (path: string) => void) => void
}
