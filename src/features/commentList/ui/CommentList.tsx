import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Comment } from "../../../entities/comment"
import { Button } from "../../../shared/ui"
import { useCommentsList } from "../model/useCommentList"

interface CommentsListProps {
  postId: number
  onAddComment: () => void // 추가
  onEdit: (comment: Comment) => void
  onDelete: (id: number) => void
  onLike: (id: number) => void
}

export const CommentsList = ({ postId, onAddComment, onEdit, onDelete, onLike }: CommentsListProps) => {
  const { comments, isLoading } = useCommentsList(postId)

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={onAddComment}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="font-medium truncate">{comment.user.username}:</span>
            <span className="truncate">{comment.body}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={() => onLike(comment.id)}>
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
      ))}
    </div>
  )
}
