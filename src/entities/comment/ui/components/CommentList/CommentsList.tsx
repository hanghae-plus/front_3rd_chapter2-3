import { Comment } from "../../../model/types"
import { CommentItem } from "./CommentItem"

interface CommentsListProps {
  comments: Comment[]
  searchQuery?: string
  onLike: (id: number) => void
  onEdit: (comment: Comment) => void
  onDelete: (id: number) => void
}

export const CommentsList = ({
  comments,
  searchQuery,
  onLike,
  onEdit,
  onDelete,
}: CommentsListProps) => {
  return (
    <div className="space-y-1">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          searchQuery={searchQuery}
          onLike={() => {
            onLike(comment.id)
          }}
          onEdit={() => {
            onEdit(comment)
          }}
          onDelete={() => onDelete(comment.id)}
        />
      ))}
    </div>
  )
}
