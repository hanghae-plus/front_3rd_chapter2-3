import { ThumbsUp } from "lucide-react"
import { Button } from "@/shared/ui"
import { Comment } from "@/entities/comment"
import { usePutCommentLikes } from "@/features/comment"

type PostCommentLikeButtonProps = {
  comment: Comment
}

export const PostCommentLikeButton = ({ comment }: PostCommentLikeButtonProps) => {
  const { mutate } = usePutCommentLikes(comment.id, comment.likes)

  const handleClickLike = () => {
    mutate()
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleClickLike}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  )
}
