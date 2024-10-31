import { MessageSquare, Edit2, Trash2 } from "lucide-react"
import { Button } from "../../../../../shared"
import { Post } from "../../../model/types"
import { useDeletePostMutation } from "../../../lib/hooks/usePostsQuery"

interface PostActionsProps {
  post: Post
  onDetail: (post: Post) => void
  onEdit: (post: Post) => void
  className?: string
  size?: "sm" | "default"
  variant?: "ghost" | "default"
}

export const PostActions = ({
  post,
  onDetail,
  onEdit,
  className = "",
  size = "sm",
  variant = "ghost",
}: PostActionsProps) => {
  const { mutate: deletePost } = useDeletePostMutation(post.id)
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
        onClick={() => {
          deletePost()
        }}
        title="삭제"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}
