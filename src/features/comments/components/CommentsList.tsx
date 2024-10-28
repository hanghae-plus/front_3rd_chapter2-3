import { Button } from '../../../shared/ui'
import { Comment } from '../../../entity/comment/model'
import { Edit2, Trash2 } from 'lucide-react'

interface CommentsListProps {
  comments: Comment[]
  onEdit: (comment: Comment) => void
  onDelete: (commentId: number) => void
}

export const CommentsList = ({ comments, onEdit, onDelete }: CommentsListProps) => {
  return (
    <div className="space-y-4 mt-4">
      <h4 className="font-semibold">댓글</h4>
      {comments.map((comment) => (
        <div key={comment.id} className="flex justify-between items-start p-3 border rounded">
          <div className="flex-1">
            <p className="text-sm">{comment.body}</p>
            <p className="text-xs text-gray-500 mt-1">
              작성자: {comment.user?.username}
            </p>
          </div>
          <div className="flex space-x-2 ml-4">
            <Button variant="ghost" size="sm" onClick={() => onEdit(comment)}>
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(comment.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
