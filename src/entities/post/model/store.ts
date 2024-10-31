import { create } from "zustand"
import { Post } from "./types.ts"

interface PostStoreState {
  posts: Post[]
  total: number
  isLoading: boolean
}

interface PostStoreAction {
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setIsLoading: (isLoading: boolean) => void
  removePosts: (postId: number) => void
  editPosts: (updatedPost: Post) => void
  addPosts: (newPost: Post) => void
}

type PostsStore = PostStoreAction & PostStoreState

export const usePostStore = create<PostsStore>((set) => ({
  posts: [],
  total: 0,
  isLoading: false,

  setTotal: (total: number) => set({ total }),

  setIsLoading: (isLoading) => set({ isLoading }),

  setPosts: (posts) => set({ posts }),

  removePosts: (postId) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    }))
  },

  editPosts: (updatedPost) => {
    set((state) => ({
      posts: state.posts.map((post) => (post.id === updatedPost.id ? updatedPost : post)),
    }))
  },

  addPosts: (newPost) => {
    set((state) => ({
      posts: [newPost, ...state.posts],
    }))
  },
}))
