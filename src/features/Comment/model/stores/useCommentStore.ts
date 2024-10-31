import { create } from "zustand"
import { Comment } from "../../../../entities/Comment/model/types"

interface CommentState {
  comments: Record<number | string, Comment[]>
  selectedComment: Comment | null
  newComment: {
    body: string
    postId: number | string | null
    userId: number
  }
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  setComments: (
    comments:
      | Record<number | string, Comment[]>
      | ((prev: Record<number | string, Comment[]>) => Record<number | string, Comment[]>),
  ) => void
  setSelectedComment: (comment: Comment | null) => void
  setNewComment: (comment: { body: string; postId: number | string | null; userId: number }) => void
  setShowAddCommentDialog: (show: boolean) => void
  setShowEditCommentDialog: (show: boolean) => void
}

export const useCommentStore = create<CommentState>((set) => ({
  comments: {},
  selectedComment: null,
  newComment: { body: "", postId: null, userId: 1 },
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  setComments: (newComments) =>
    set((state) => ({
      comments: typeof newComments === "function" ? newComments(state.comments) : newComments,
    })),
  setSelectedComment: (selectedComment) => set({ selectedComment }),
  setNewComment: (newComment) => set({ newComment }),
  setShowAddCommentDialog: (show) => set({ showAddCommentDialog: show }),
  setShowEditCommentDialog: (show) => set({ showEditCommentDialog: show }),
}))
