import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { create } from "zustand"
import { User } from "../../../entities/user"
import { usePostsQuery } from "./queries"
import { Post } from "./types"

interface PostsState {
  // 서버 데이터
  allPosts: Post[]
  users: User[] // 추가
  total: number

  // UI 상태 (기존과 동일)
  isLoading: boolean
  skip: number
  limit: number
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: "asc" | "desc"
  modalType: "add" | "edit" | "comment" | "add-comment" | "edit-comment" | null
  selectedPost: Post | null

  // actions
  setAllPosts: (posts: Post[]) => void
  setUsers: (users: User[]) => void // 추가
  setLoading: (isLoading: boolean) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: "asc" | "desc") => void
  setModalType: (type: "add" | "edit" | "comment" | "add-comment" | "edit-comment" | null) => void
  setSelectedPost: (post: Post | null) => void
  getFilteredPosts: () => Post[]
}

export const usePostsStore = create<PostsState>((set, get) => ({
  allPosts: [],
  users: [], // 추가
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

    // 사용자 정보 결합
    filteredPosts = filteredPosts.map((post) => ({
      ...post,
      userInfo: state.users.find((user) => user.id === post.userId),
    }))

    // 페이지네이션
    const start = state.skip
    const end = state.skip + state.limit
    return filteredPosts.slice(start, end)
  },

  // 기존 actions
  setAllPosts: (posts) => set({ allPosts: posts, total: posts.length }),
  setUsers: (users) => set({ users }), // 추가
  setLoading: (isLoading) => set({ isLoading }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSearchQuery: (searchQuery) => set({ searchQuery, skip: 0 }),
  setSelectedTag: (selectedTag) => set({ selectedTag, skip: 0 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setModalType: (modalType) => set({ modalType }),
  setSelectedPost: (selectedPost) => set({ selectedPost }),
}))

export const usePostsData = () => {
  const { setAllPosts, setUsers, setLoading } = usePostsStore()

  // 게시물과 사용자 데이터 동시에 가져오기
  const postsQuery = usePostsQuery()
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => fetch("/api/users?limit=0&select=username,image").then((res) => res.json()),
  })

  useEffect(() => {
    if (postsQuery.data && usersQuery.data) {
      setAllPosts(postsQuery.data.posts)
      setUsers(usersQuery.data.users)
    }
    setLoading(postsQuery.isLoading || usersQuery.isLoading)
  }, [postsQuery.data, usersQuery.data, postsQuery.isLoading, usersQuery.isLoading])

  return { postsQuery, usersQuery }
}
