import { useMutationCommentDelete } from "@features/comment/api"
import { Button } from "@shared/ui/button"
import { Trash2 } from "lucide-react"

export const DeleteCommentButton: React.FC<{ commentId: number }> = ({
  commentId,
}) => {
  const { deleteComment } = useMutationCommentDelete()
  return (
    <Button variant="ghost" size="sm" onClick={() => deleteComment(commentId)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
