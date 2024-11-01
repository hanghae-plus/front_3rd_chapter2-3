import { useCommentDelete } from "@entities/comment/hooks/useCommentDelete"
import { Button } from "@shared/ui/button"
import { Trash2 } from "lucide-react"

export const DeleteCommentBtn: React.FC<{ commentId: number }> = ({
  commentId,
}) => {
  const { deleteComment } = useCommentDelete()
  return (
    <Button variant="ghost" size="sm" onClick={() => deleteComment(commentId)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  )
}
