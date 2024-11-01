import { useCommentUpdate } from "@entities/comment/hooks/useCommentUpdate"
import { Comment } from "@entities/comment/types"
import { Button } from "@shared/ui/button"
import { ThumbsUp } from "lucide-react"

export const LikeCommentBtn: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { updateComment } = useCommentUpdate()
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => updateComment({ ...comment, likes: comment.likes + 1 })}
    >
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}
