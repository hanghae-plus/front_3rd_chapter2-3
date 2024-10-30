import { create } from "zustand"
import { Post } from "../../../entities/post/model/types.ts"

interface PostStoreState {
  posts: Post[]
  total: number
  selectedPost: Post | null
  isLoading: boolean
}

interface PostStoreAction {
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setSelectedPost: (post: Post | null) => void
  setIsLoading: (isLoading: boolean) => void
}

type PostsStore = PostStoreAction & PostStoreState

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  total: 0,
  selectedPost: null,
  isLoading: false,

  setPosts: (posts) => {
    console.log(posts, "storePost")
    return set({ posts })
  },
  setTotal: (total: number) => set({ total }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setIsLoading: (isLoading) => {
    console.log(isLoading, "stoare")
    return set({ isLoading })
  },
}))
