import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"
import { useCommentAddModalStore } from "../../comment/model/commentAddModalStore"

interface Props {
  postId: number
}

export const CommentAddButton = ({ postId }: Props) => {
  const { setNewComment, setShowAddCommentModal } = useCommentAddModalStore()

  return (
    <Button
      size="sm"
      onClick={() => {
        setNewComment((prev) => ({ ...prev, postId }))
        setShowAddCommentModal(true)
      }}
    >
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  )
}
