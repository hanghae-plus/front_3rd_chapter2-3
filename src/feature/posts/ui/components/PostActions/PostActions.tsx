import { MessageSquare, Edit2, Trash2 } from "lucide-react"
import { Button } from "../../../../../shared"
import { Post } from "../../../model/types"

interface PostActionsProps {
  post: Post
  onDetail: (post: Post) => void
  onEdit: (post: Post) => void
  onDelete: (id: number) => void
  className?: string
  size?: "sm" | "default"
  variant?: "ghost" | "default"
}

export const PostActions = ({
  post,
  onDetail,
  onEdit,
  onDelete,
  className = "",
  size = "sm",
  variant = "ghost",
}: PostActionsProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        variant={variant}
        size={size}
        onClick={() => onDetail(post)}
        title="상세 보기"
      >
        <MessageSquare className="w-4 h-4" />
      </Button>
      <Button
        variant={variant}
        size={size}
        onClick={() => onEdit(post)}
        title="수정"
      >
        <Edit2 className="w-4 h-4" />
      </Button>
      <Button
        variant={variant}
        size={size}
        onClick={() => onDelete(post.id)}
        title="삭제"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
