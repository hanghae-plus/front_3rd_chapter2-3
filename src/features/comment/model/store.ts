import { create } from "zustand"

interface CommentStoreState {
  postId: number
}

interface CommentStoreAction {
  setPostId: (postId: number) => void
}

type CommentStore = CommentStoreState & CommentStoreAction

export const useCommentStore = create<CommentStore>((set) => ({
  postId: 0,

  setPostId: (postId: number) => set({ postId }),
}))
