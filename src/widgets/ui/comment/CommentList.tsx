import { useComment } from "../../../features/model/comment/useComment"
import { CommentHeader } from "../../../features/ui/comment/CommentHeader"
import { CommentItem } from "../../../features/ui/comment/CommentItem"
import type { Comment } from "../../../shared/types"

interface CommentListProps {
  postId: number
  searchQuery: string
  onAddClick: () => void
  onEditClick: (comment: Comment) => void
}

export const CommentList = ({ postId, searchQuery, onAddClick, onEditClick }: CommentListProps) => {
  const { comments, handleLikeComment, handleDeleteComment } = useComment()

  const postComments = comments[postId] || []

  return (
    <div className="mt-2">
      <CommentHeader onAddClick={onAddClick} />
      <div className="space-y-1">
        {postComments.map((comment: Comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            searchQuery={searchQuery}
            onLike={() => handleLikeComment(comment.id, postId)}
            onEdit={() => onEditClick(comment)}
            onDelete={() => handleDeleteComment(comment.id)}
          />
        ))}
      </div>
    </div>
  )
}
