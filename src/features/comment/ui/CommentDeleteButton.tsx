import { Trash2 } from "lucide-react"
import { Comment } from "../../../entities/comment/model/types"
import { Button } from "../../../shared/ui"
import { useDeleteComment } from "../api/useDeleteComment"

type Props = {
  commentId: Comment["id"]
}

export const CommentDeleteButton = ({ commentId }: Props) => {
  const { mutate: deleteComment } = useDeleteComment()

  return (
    <Button variant="ghost" size="sm" onClick={() => deleteComment(commentId)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
