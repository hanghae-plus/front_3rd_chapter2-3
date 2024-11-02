import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/text"
import { Comment } from "../../../entities/comment/model/types"

export interface CommentItemProps {
  comment: Comment
  searchQuery: string
  onEditClick: (comment: Comment) => void
  onLikeClick: (id: number, postId: number) => void
  onDeleteClick: (id: number, postId: number) => void
}

const CommentItem = ({ comment, searchQuery, onLikeClick, onEditClick, onDeleteClick }: CommentItemProps) => {
  const { id, user, body, likes, postId } = comment

  const handleLikeClick = () => {
    onLikeClick(id, postId)
  }

  const handleEditClick = () => {
    onEditClick(comment)
    // setSelectedComment(comment)
    // setShowEditCommentDialog(true)
  }

  const handleDeleteClick = () => {
    onDeleteClick(id, postId)
    // deleteComment(comment.id, postId)
  }

  const designedText = highlightText(body, searchQuery)

  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{user.username}:</span>
        <span className="truncate">{designedText}</span>
      </div>

      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={handleLikeClick}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{likes}</span>
        </Button>

        <Button variant="ghost" size="sm" onClick={handleEditClick}>
          <Edit2 className="w-3 h-3" />
        </Button>

        <Button variant="ghost" size="sm" onClick={handleDeleteClick}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}

export default CommentItem
