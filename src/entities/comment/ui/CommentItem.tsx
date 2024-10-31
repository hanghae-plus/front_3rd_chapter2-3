import { type FC } from "react"
import { Edit2, Trash2 } from "lucide-react"
import { Button } from "@/shared/ui/components/button"
import type { Comment } from "../model/types"

interface CommentItemProps {
  comment: Comment
  onEdit: (comment: Comment) => void
  onDelete: (id: number) => void
  onUserClick: (userId: number) => void
}

export const CommentItem: FC<CommentItemProps> = ({
  comment,
  onEdit,
  onDelete,
  onUserClick,
}) => {
  return (
    <div className="flex items-start gap-4 p-4 border-b">
      <img
        src={comment.user?.image}
        alt={comment.user?.username}
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => onUserClick(comment.userId)}
      />
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div
            className="font-medium cursor-pointer hover:underline"
            onClick={() => onUserClick(comment.userId)}
          >
            {comment.user?.username}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(comment)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(comment.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <p className="mt-1 text-gray-600">{comment.body}</p>
      </div>
    </div>
  )
}