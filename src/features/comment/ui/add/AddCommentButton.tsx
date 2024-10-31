import { useModal } from "@features/modal/hooks"
import { Button } from "@shared/ui/button"
import { Plus } from "lucide-react"

export const AddCommentButton = () => {
  const { openModal } = useModal()

  return (
    <Button size="sm" onClick={() => openModal("createComment")}>
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  )
} 