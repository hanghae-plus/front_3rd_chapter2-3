import { CommentAction, CommentState } from '@entities/comment/model/types'
import { create } from 'zustand'

export const commentStore = create<CommentState & CommentAction>((set) => ({
  newComment: { body: '', postId: null, userId: 1 },
  selectedComment: null,
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  setNewComment: (newComment) => set({ newComment }),
  setShowAddCommentDialog: (showAddCommentDialog) => set({ showAddCommentDialog }),
  setShowEditCommentDialog: (showEditCommentDialog) => set({ showEditCommentDialog }),
  setSelectedComment: (selectedComment) => set({ selectedComment }),
}))
