import { create } from "zustand"
import { Post } from "../../../../entities/Post/model/types"

interface PostState {
  posts: Post[]
  total: number
  skip: number
  limit: number
  selectedPost: Post | null
  showAddDialog: boolean
  showEditDialog: boolean
  newPost: {
    title: string
    body: string
    userId: number
  }
  loading: boolean
  searchQuery: string
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSelectedPost: (post: Post | null) => void
  setShowAddDialog: (show: boolean) => void
  setShowEditDialog: (show: boolean) => void
  setNewPost: (post: { title: string; body: string; userId: number }) => void
  setLoading: (loading: boolean) => void
  setSearchQuery: (searchQuery: string) => void
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  total: 0,
  skip: 0,
  limit: 10,
  selectedPost: null,
  showAddDialog: false,
  showEditDialog: false,
  newPost: { title: "", body: "", userId: 1 },
  loading: false,
  searchQuery: "",
  setPosts: (posts) => set({ posts }),
  setTotal: (total) => set({ total }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSelectedPost: (selectedPost) => set({ selectedPost }),
  setShowAddDialog: (showAddDialog) => set({ showAddDialog }),
  setShowEditDialog: (showEditDialog) => set({ showEditDialog }),
  setNewPost: (newPost) => set({ newPost }),
  setLoading: (loading) => set({ loading }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}))
