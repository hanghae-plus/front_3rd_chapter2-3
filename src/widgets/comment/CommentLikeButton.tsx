import { ThumbsUp } from "lucide-react"
import { useComment } from "../../features/comment/model/store"
import { Button } from "../../shared/ui"
import { PostId } from "../../entities/post/model/type"
import { Comment } from "../../entities/comment/model/type"

export const CommentLikeButton = ({ comment, postId }: { comment: Comment; postId: PostId }) => {
  const { likeComment } = useComment()

  return (
    <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}
