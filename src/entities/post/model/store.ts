import { useEffect } from "react"
import { create } from "zustand"
import { usePostsByTagQuery, usePostsQuery, useSearchPostsQuery } from "./queries"
import { Post } from "./types"

interface PostsState {
  // 서버 데이터
  posts: Post[]
  total: number

  // UI 상태
  isLoading: boolean
  skip: number
  limit: number
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: "asc" | "desc"
  modalType: "add" | "edit" | "comment" | null
  selectedPost: Post | null

  // actions
  setPosts: (posts: Post[], total: number) => void
  setLoading: (isLoading: boolean) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: "asc" | "desc") => void
  setModalType: (type: "add" | "edit" | "comment" | null) => void
  setSelectedPost: (post: Post | null) => void
}

export const usePostsStore = create<PostsState>((set) => ({
  // 초기 상태
  posts: [],
  total: 0,
  isLoading: false,
  skip: 0,
  limit: 10,
  searchQuery: "",
  selectedTag: "",
  sortBy: "",
  sortOrder: "asc",
  modalType: null,
  selectedPost: null,

  // actions
  setPosts: (posts, total) => set({ posts, total }),
  setLoading: (isLoading) => set({ isLoading }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedTag: (selectedTag) => set({ selectedTag }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setModalType: (modalType) => set({ modalType }),
  setSelectedPost: (selectedPost) => set({ selectedPost }),
}))

// 커스텀 훅: TanStack Query와 Zustand를 연결
export const usePostsData = () => {
  const { skip, limit, searchQuery: query, selectedTag, setPosts, setLoading } = usePostsStore()

  const postsQuery = usePostsQuery(limit, skip)
  const searchPostsQuery = useSearchPostsQuery(query)
  const tagPostsQuery = usePostsByTagQuery(selectedTag, limit, skip)

  const activeQuery = query ? searchPostsQuery : selectedTag ? tagPostsQuery : postsQuery

  useEffect(() => {
    if (activeQuery.data) {
      setPosts(activeQuery.data.posts, activeQuery.data.total)
    }
    setLoading(activeQuery.isLoading)
  }, [activeQuery.data, activeQuery.isLoading, setPosts, setLoading])

  return activeQuery // 필요한 경우 쿼리 상태 반환
}
