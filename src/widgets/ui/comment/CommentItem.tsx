import { ThumbsUp, Edit2, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui/button/Button"
import { Comment } from "../../../shared/types"
import { highlightText } from "../../../shared/lib/highlight"

interface CommentItemProps {
  comment: Comment
  searchQuery: string
  onLike: () => void
  onEdit: () => void
  onDelete: () => void
}

export const CommentItem = ({ comment, searchQuery, onLike, onEdit, onDelete }: CommentItemProps) => (
  <div className="flex items-center justify-between text-sm border-b pb-1">
    <div className="flex items-center space-x-2 overflow-hidden">
      <span className="font-medium truncate">{comment.user.username}:</span>
      <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
    </div>
    <div className="flex items-center space-x-1">
      <Button variant="ghost" size="sm" onClick={onLike}>
        <ThumbsUp className="w-3 h-3" />
        <span className="ml-1 text-xs">{comment.likes}</span>
      </Button>
      <Button variant="ghost" size="sm" onClick={onEdit}>
        <Edit2 className="w-3 h-3" />
      </Button>
      <Button variant="ghost" size="sm" onClick={onDelete}>
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  </div>
)
