import { create } from "zustand"
import { Comment_i, Comments_i } from "../../../entities/comment/model/types"

interface CommentState_i {
  comments: Comments_i
  selectedComment: Comment_i | null
  addComment: (comment: Comment_i) => void
  updateComment: (comment: Comment_i) => void
  deleteComment: (id: number, postId: number) => void
  likeComment: (id: number, postId: number, data: Comment_i) => void
  setComments: (postId: number, data: Comments_i) => void
  setSelectedComment: (comment: Comment_i | null) => void
}

export const useCommentStore = create<CommentState_i>((set, get) => ({
  comments: {},
  selectedComment: null,
  addComment: (data) => {
    set((state) => ({
      comments: {
        ...state.comments,
        [data.postId!]: [...(state.comments[data.postId!] ?? []), data],
      },
    }))
  },

  updateComment: (data) => {
    set((state) => ({
      comments: {
        ...state.comments,
        [data.postId!]: state.comments[data.postId!].map((comment) => (comment.id === data.id ? data : comment)),
      },
    }))
  },

  deleteComment: (id, postId) => {
    set((state) => ({
      comments: { ...state.comments, [postId]: state.comments[postId].filter((comment) => comment.id !== id) },
    }))
  },

  likeComment: (id, postId, data) => {
    console.warn("likeComment", id, postId, data)
    console.warn("likeComment get().comments[postId]", get().comments[postId])
    const comment = get().comments[postId].find((c) => c.id === id)

    if (comment === undefined) return

    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: state.comments[postId].map((comment) => (comment.id === data.id ? data : comment)),
      },
    }))
  },

  setComments: (postId, data) => {
    if (postId in get().comments) return

    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: data.comments,
      },
    }))
  },

  setSelectedComment: (comment) => {
    set((state) => ({
      ...state,
      selectedComment: comment,
    }))
  },
}))
