import { create } from "zustand"
import { Comment } from "./types.ts"

type CommentsByPostId = {
  [postId: number]: Comment[]
}

interface CommentStoreState {
  postId: number
  comments: CommentsByPostId
}

interface CommentStoreAction {
  setPostId: (postId: number) => void
  setComments: (comments: CommentsByPostId) => void
  updateComments: (postId: number, commentId: number, body: string) => void
  deleteComments: (postId: number, commentId: number) => void
  addComments: (postId: number, comment: Comment) => void
}

type CommentStore = CommentStoreState & CommentStoreAction

export const useCommentStore = create<CommentStore>((set, get) => ({
  postId: 0,
  comments: {},

  setPostId: (postId: number) => set({ postId }),
  setComments: (comments: CommentsByPostId) => {
    const prevComments = get().comments
    const updatedComments = { ...prevComments, ...comments }
    return set({ comments: updatedComments })
  },

  updateComments: (postId: number, commentId: number, body: string) => {
    const prevComments = get().comments
    const postComments = prevComments[postId] || []

    const updatedPostComments = postComments.map((comment) =>
      comment.id === commentId ? { ...comment, body } : comment,
    )

    set({
      comments: {
        ...prevComments,
        [postId]: updatedPostComments,
      },
    })
  },

  deleteComments: (postId: number, commentId: number) => {
    const prevComments = get().comments
    const postComments = prevComments[postId] || []

    const updatedPostComments = postComments.filter((comment) => comment.id !== commentId)

    set({
      comments: {
        ...prevComments,
        [postId]: updatedPostComments,
      },
    })
  },

  addComments: (postId: number, comment: Comment) => {
    const prevComments = get().comments
    const postComments = prevComments[postId] || []
    set({
      comments: {
        ...prevComments,
        [postId]: [...postComments, comment],
      },
    })
  },
}))
