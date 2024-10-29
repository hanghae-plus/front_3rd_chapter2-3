import { useState } from "react"
import { Comments, NewComment } from "../../../entities/comment/model/type"
import { createCommentApi, deleteCommentApi } from "../../../entities/comment/api"

export const useComment = () => {
  const [comments, setComments] = useState<Comments>({})
  const [newComment, setNewComment] = useState<NewComment>({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)

  const addComment = async () => {
    const data = await createCommentApi(newComment)
    setComments((prev: Comments) => ({
      ...prev,
      [data.postId]: [...(prev[data.postId] || []), data],
    }))
    setShowAddCommentDialog(false)
    setNewComment({ body: "", postId: null, userId: 1 })
  }
  const deleteComment = async (id: number, postId: number) => {
    await deleteCommentApi(id)
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId].filter((comment) => comment.id !== id),
    }))
  }
}
