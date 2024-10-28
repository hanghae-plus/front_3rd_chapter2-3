import { createContext, PropsWithChildren, useContext, useMemo } from "react"
import { usePostParams } from "../../../features/post-view/model/usePostParams"

interface PostParamsContextType {
  skip: number
  setSkip: (skip: number) => void
  limit: number
  setLimit: (limit: number) => void
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  sortBy: string
  setSortBy: (sortBy: string) => void
  sortOrder: string
  setSortOrder: (sortOrder: string) => void
  selectedTag: string
  setSelectedTag: (selectedTag: string) => void

  updateURL: () => void
}

const PostParamsContext = createContext<PostParamsContextType | null>(null)

export const PostParamsContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const postParamsHookValues = usePostParams()
  const value = useMemo(() => ({ ...postParamsHookValues }), [postParamsHookValues])

  return <PostParamsContext.Provider value={value}>{children}</PostParamsContext.Provider>
}

export const usePostParamsContext = () => {
  const context = useContext(PostParamsContext)

  if (!context) {
    throw new Error("usePostParamsContext must be used within a PostParamsContextProvider")
  }

  return context
}
