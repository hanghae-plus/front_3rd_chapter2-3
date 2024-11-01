import { Trash2 } from "lucide-react"
import { Button } from "@/shared/ui"
import { Comment } from "@/entities/comment"
import { useDeleteComment } from "@/features/comment"

type PostCommentDeleteButtonProps = {
  comment: Comment
}

const PostCommentDeleteButton = ({ comment }: PostCommentDeleteButtonProps) => {
  const { mutate } = useDeleteComment(comment.id)

  const handleClickDelete = () => {
    mutate()
  }
  return (
    <Button variant="ghost" size="sm" onClick={handleClickDelete}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}

export default PostCommentDeleteButton
