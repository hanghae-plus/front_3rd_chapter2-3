import { create } from "zustand"
import { Post } from "@/entities/post"

type PostStore = {
  post: Post | null
  updatePost: (post: Post) => void
}

export const usePostStore = create<PostStore>((set) => ({
  post: null,
  updatePost: (post: Post) => set({ post }),
}))
