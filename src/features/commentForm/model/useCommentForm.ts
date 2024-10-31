import { useState } from "react"
import { Comment, commentsAPI } from "../../../entities/comment"
import { CommentFormData } from "./types"

export const useCommentForm = (comment?: Comment) => {
  const [formData, setFormData] = useState<CommentFormData>({
    body: comment?.body || "",
    postId: comment?.postId || 0,
    userId: comment?.userId || 1,
  })

  const handleSubmit = async () => {
    if (comment) {
      return commentsAPI.updateComment(comment.id, formData.body)
    }
    return commentsAPI.addComment(formData)
  }

  return {
    formData,
    setFormData,
    handleSubmit,
  }
}
