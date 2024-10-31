import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { ThumbsUp } from "lucide-react"
import { Comment } from "../../../entities/comment/model/types.ts"
import { useLikeCommentMutation } from "../api/useMutateLikeComment.ts"

interface Props {
  comment: Comment
  postId: number
}

const CommentLikeButton = ({ comment, postId }: Props) => {
  const { mutate } = useLikeCommentMutation(postId)

  const likeComment = () => {
    mutate({ commentId: comment.id, likes: comment.likes + 1 })
  }

  return (
    <Button variant="ghost" size="sm" onClick={likeComment}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}

export default CommentLikeButton
