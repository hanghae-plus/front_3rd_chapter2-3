import CommentItem from "./CommentItem"
import { Button } from "../../../shared/ui/Button/Button"
import { Plus } from "lucide-react"

interface CommentListProps {
  comments: Comment[]
  onAddComment: () => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (commentId: number) => void
}

const CommentList: React.FC<CommentListProps> = ({ comments, onAddComment, onEditComment, onDeleteComment }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold">댓글</h3>
      <Button size="sm" onClick={onAddComment}>
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>
    </div>
    <div className="space-y-1">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          onEdit={onEditComment}
          onDelete={onDeleteComment}
        />
      ))}
    </div>
  </div>
)

export default CommentList