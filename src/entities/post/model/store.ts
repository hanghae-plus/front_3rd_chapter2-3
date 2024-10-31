import { useEffect } from "react"
import { create } from "zustand"
import { usePostsQuery } from "./queries"
import { Post } from "./types"

interface PostsState {
  // 서버 데이터
  allPosts: Post[] // 전체 데이터
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

  // computed value를 위한 getter
  posts: Post[] // 현재 페이지에 보여줄 데이터

  // actions
  setAllPosts: (posts: Post[]) => void
  setLoading: (isLoading: boolean) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: "asc" | "desc") => void
  setModalType: (type: "add" | "edit" | "comment" | null) => void
  setSelectedPost: (post: Post | null) => void
  getFilteredPosts: () => Post[]
}

export const usePostsStore = create<PostsState>((set, get) => ({
  allPosts: [],
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
  posts: [], // 일반 상태로 변경

  getFilteredPosts: () => {
    const state = get()
    let filteredPosts = [...state.allPosts]

    // 검색어 필터링
    if (state.searchQuery) {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          post.body.toLowerCase().includes(state.searchQuery.toLowerCase()),
      )
    }

    // 태그 필터링
    if (state.selectedTag && state.selectedTag !== "all") {
      filteredPosts = filteredPosts.filter((post) => post.tags.includes(state.selectedTag))
    }

    // 정렬
    if (state.sortBy) {
      filteredPosts.sort((a, b) => {
        switch (state.sortBy) {
          case "id":
            return state.sortOrder === "asc"
              ? a.id - b.id // 숫자 비교로 변경
              : b.id - a.id

          case "title":
            return state.sortOrder === "asc"
              ? String(a.title).localeCompare(String(b.title))
              : String(b.title).localeCompare(String(a.title))

          case "reactions":
            const aLikes = a.reactions?.likes || 0
            const bLikes = b.reactions?.likes || 0
            return state.sortOrder === "asc" ? aLikes - bLikes : bLikes - aLikes

          default:
            return 0
        }
      })
    }

    // 페이지네이션
    const start = state.skip
    const end = state.skip + state.limit
    return filteredPosts.slice(start, end)
  },

  setAllPosts: (posts) => set({ allPosts: posts, total: posts.length }),
  setLoading: (isLoading) => set({ isLoading }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSearchQuery: (searchQuery) => set({ searchQuery, skip: 0 }), // 검색시 첫 페이지로
  setSelectedTag: (selectedTag) => set({ selectedTag, skip: 0 }), // 태그 변경시 첫 페이지로
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setModalType: (modalType) => set({ modalType }),
  setSelectedPost: (selectedPost) => set({ selectedPost }),
}))

export const usePostsData = () => {
  const { setAllPosts, setLoading } = usePostsStore()

  // 한 번에 모든 데이터를 가져옴
  const postsQuery = usePostsQuery() // limit: 0으로 모든 데이터 요청

  useEffect(() => {
    if (postsQuery.data) {
      setAllPosts(postsQuery.data.posts)
    }
    setLoading(postsQuery.isLoading)
  }, [postsQuery.data, postsQuery.isLoading])

  return postsQuery
}
