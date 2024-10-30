import React from "react"
import { CommentModel } from "./CommentModel"

interface CommentProps {
  comment: CommentModel
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="comment">
      <p>{comment.content}</p>
      <span>By {comment.author}</span>
    </div>
  )
}

export default Comment
