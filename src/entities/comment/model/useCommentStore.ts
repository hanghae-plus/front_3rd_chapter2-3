import { create } from "zustand"
import { CommentType, CommentsResponseType } from "../../../shared/type"

interface CommentState {
  comments: CommentsResponseType
  selectedComment: CommentType | null
  newComment: CommentType
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  setComments: (postId: number, newComments: CommentType[]) => void
  setSelectedComment: (comment: CommentType) => void
  setNewComment: (newComment: CommentType) => void
  setShowAddCommentDialog: (show: boolean) => void
  setShowEditCommentDialog: (show: boolean) => void
}

const useCommentStore = create<CommentState>((set) => ({
  comments: {},
  selectedComment: null,
  newComment: { body: "", postId: null, userId: 1 },
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  setComments: (postId: number, newComments: CommentType[]) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [postId]: newComments,
      },
    })),
  setSelectedComment: (comment: CommentType) => set({ selectedComment: comment }),
  setNewComment: (newComment) => set({ newComment: newComment }),
  setShowAddCommentDialog: (show: boolean) => set({ showAddCommentDialog: show }),
  setShowEditCommentDialog: (show: boolean) => set({ showEditCommentDialog: show }),
}))

export default useCommentStore
