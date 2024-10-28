import { createContext, PropsWithChildren, useContext, useMemo } from "react"
import { useComments } from "../../features/comment/model/useComments"
import { Comment, NewComment } from "../../entities/comment/types"

interface CommentContextType {
  comments: Record<number, Comment[]>
  newComment: NewComment
  setNewComment: (comment: NewComment) => void

  showAddCommentDialog: boolean
  setShowAddCommentDialog: (show: boolean) => void

  getComments: (postId: number) => void
  addComment: () => void
  likeComment: (commentId: number, postId: number) => void
  deleteComment: (commentId: number, postId: number) => void

  selectedComment: Comment | null
  setSelectedComment: (comment: Comment) => void

  showEditCommentDialog: boolean
  setShowEditCommentDialog: (show: boolean) => void

  updateComment: () => void
}

const CommentContext = createContext<CommentContextType | null>(null)

export const CommentContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const commentHookValues = useComments()
  const value = useMemo(() => ({ ...commentHookValues }), [commentHookValues])

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
}

export const useCommentContext = () => {
  const context = useContext(CommentContext)

  if (!context) {
    throw new Error("usePostContext must be used within a PostContextProvider")
  }

  return context
}
