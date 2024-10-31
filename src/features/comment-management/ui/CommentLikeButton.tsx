import { ThumbsUp } from "lucide-react"
import { Button } from "../../../shared/ui/button"

interface Props {
  likeComment: any
  comment: any
  postId: any
}

const CommentLikeButton = ({ likeComment, comment, postId }: Props) => {
  return (
    <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}

export default CommentLikeButton
