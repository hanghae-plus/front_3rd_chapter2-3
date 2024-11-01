import { useEditCommentDialog } from "@features/dialog/hooks/useEditCommentDialog"
import { useSelectedComment } from "@entities/comment/hooks/useSelectedComment"
import { Comment } from "@entities/comment/types"
import { Button } from "@shared/ui/button"
import { Edit2 } from "lucide-react"
import { useEffect } from "react"

export const EditCommentBtn: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { openDialog } = useEditCommentDialog()
  const { updateSelectedComment } = useSelectedComment()

  useEffect(() => {
    updateSelectedComment(comment)
  }, [comment])

  return (
    <Button variant="ghost" size="sm" onClick={() => openDialog()}>
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}
