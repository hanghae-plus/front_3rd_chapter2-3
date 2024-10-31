import { create } from "zustand"
import { Post_i } from "../../../entities/post/model/types"

interface PostState_i {
  total: number
  posts: Post_i[]
  selectedPost: Post_i | null
  addPost: (post: Post_i) => void
  updatePost: (post: Post_i) => void
  deletePost: (id: number) => void
  setPosts: (posts: Post_i[]) => void
  setSelectedPost: (post: Post_i | null) => void
}

export const usePostStore = create<PostState_i>((set) => ({
  total: 0,
  posts: [],
  selectedPost: null,
  setTotal: (total: number) => set((state) => ({ ...state, total })),
  addPost: (post: Post_i) => {
    set((state) => ({
      posts: [...state.posts, post],
    }))
  },
  updatePost: (post: Post_i) => {
    set((state) => ({
      posts: state.posts.map((p) => (p.id === post.id ? post : p)),
    }))
  },
  deletePost: (id: number) => {
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    }))
  },
  setPosts: (posts) => set({ posts }),
  setSelectedPost: (post) => set({ selectedPost: post }),
}))
