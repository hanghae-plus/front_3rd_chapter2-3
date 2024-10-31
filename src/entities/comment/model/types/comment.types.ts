import { User } from './user.types'

export interface Comment {
  body: string
  id: number
  likes: number
  postId: number
  user: User
}

export interface CommentsState {
  [key: number]: Comment[]
}

export interface NewComment {
  body: string
  postId: number | null
  userId: number
}

export interface CommentState {
  newComment: NewComment
  selectedComment: Comment | null
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
}

export interface CommentAction {
  setNewComment: (newComment: NewComment) => void
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => void
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
  setSelectedComment: (selectedComment: Comment | null) => void
}

export interface CommentMutationState {
  isPending: boolean
  isError: boolean
  error: Error | null
}
