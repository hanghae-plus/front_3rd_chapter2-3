import { useSelectedComment } from "@features/comment/hooks"
import { useModal } from "@features/modal/hooks"
import { Comment } from "@entities/comment/model"
import { Button } from "@shared/ui/button"
import { Edit2 } from "lucide-react"
import { useEffect } from "react"

export const UpdateCommentButton: React.FC<{ comment: Comment }> = ({ comment }) => {
  const { openModal } = useModal()
  const { updateSelectedComment } = useSelectedComment()

  useEffect(() => {
    updateSelectedComment(comment)
  }, [comment])

  return (
    <Button variant="ghost" size="sm" onClick={() => openModal("editComment")}>
      <Edit2 className="w-3 h-3" />
    </Button>
  )
}
