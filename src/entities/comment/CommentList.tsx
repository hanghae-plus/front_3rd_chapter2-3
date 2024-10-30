import React from "react"
import Comment from "./Comment"
import { CommentModel } from "./CommentModel"

interface CommentListProps {
  comments: CommentModel[]
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default CommentList
