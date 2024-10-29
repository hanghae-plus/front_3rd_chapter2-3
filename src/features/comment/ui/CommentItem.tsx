import { Button } from "../../../shared/ui/Button/Button"
import { ThumbsUp, Edit2, Trash2 } from "lucide-react"

interface CommentItemProps {
  comment: Comment
  onEdit: (comment: Comment) => void
  onDelete: (commentId: number) => void
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onEdit, onDelete }) => (
  <div className="flex items-center justify-between text-sm border-b pb-1">
    <div className="flex items-center space-x-2 overflow-hidden">
      <span className="font-medium truncate">{comment.user.username}:</span>
      <span className="truncate">{comment.body}</span>
    </div>
    <div className="flex items-center space-x-1">
      <Button variant="ghost" size="sm">
        <ThumbsUp className="w-3 h-3" />
        <span className="ml-1 text-xs">{comment.likes}</span>
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onEdit(comment)}>
        <Edit2 className="w-3 h-3" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onDelete(comment.id)}>
        <Trash2 className="w-3 h-3" />
      </Button>
    </div>
  </div>
)

export default CommentItem