import { useState } from "react"
import { PostSearchState } from "./types"

export const usePostSearch = (onSearch: (query: string) => void) => {
  const [state, setState] = useState<PostSearchState>({
    searchQuery: "",
    isSearching: false,
  })

  const handleSearch = async () => {
    setState((prev) => ({ ...prev, isSearching: true }))
    await onSearch(state.searchQuery)
    setState((prev) => ({ ...prev, isSearching: false }))
  }

  return {
    ...state,
    setSearchQuery: (query: string) => setState((prev) => ({ ...prev, searchQuery: query })),
    handleSearch,
  }
}
