import { useMutationCommentUpdate } from "@features/comment/api"
import { Comment } from "@entities/comment/model"
import { Button } from "@shared/ui/button"
import { ThumbsUp } from "lucide-react"
import { ReactionText } from "@entities/comment/ui/ReactionText"

export const LikeCommnetButton: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { updateComment } = useMutationCommentUpdate()
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => updateComment({ ...comment, likes: comment.likes + 1 })}
    >
      <ThumbsUp className="w-3 h-3" />
      <ReactionText  comment={comment} />
    </Button>
  )
}
