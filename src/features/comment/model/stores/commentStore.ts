import { Comment, NewComment } from '@entities/model/types'
import { create } from 'zustand'

interface CommentState {
  newComment: NewComment
  selectedComment: Comment | null
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
}

interface CommentAction {
  setNewComment: (newComment: NewComment) => void
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => void
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
  setSelectedComment: (selectedComment: Comment | null) => void
}

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
