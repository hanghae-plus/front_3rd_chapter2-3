import { ThumbsUp } from "lucide-react"
import { Comment } from "../../../entities/comment/model/types"
import { Button } from "../../../shared/ui"
import { useLikeComment } from "../api/useLikeComment"

type Props = {
  comment: Comment
}

export const CommentLikeButton = ({ comment }: Props) => {
  const { mutate: likeCommentMutate } = useLikeComment()

  const likeComment = (id: Comment["id"]) => {
    likeCommentMutate({ id, likes: comment.likes })
  }

  return (
    <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id)}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}
