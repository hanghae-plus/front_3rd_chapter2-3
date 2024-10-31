import { ThumbsUp } from "lucide-react"
import { Button } from "../../../shared/ui/button"
import likeComment from "../../../entities/comment/model/likeComment"

interface Props {
  comment: any
  postId: any
}

const CommentLikeButton = ({ comment, postId }: Props) => {
  return (
    <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}

export default CommentLikeButton
