import { useState } from "react"
import { Comments, CommentsState, NewComment } from "../model/Comments"

const useCommentState = () => {
  const [comments, setComments] = useState<CommentsState>({})
  const [selectedComment, setSelectedComment] = useState<Comments | null>(null)
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)

  return {
    comments,
    setComments,
    selectedComment,
    setSelectedComment,
    newComment,
    setNewComment,
    showAddCommentDialog,
    setShowAddCommentDialog,
    showEditCommentDialog,
    setShowEditCommentDialog,
  }
}

export default useCommentState
