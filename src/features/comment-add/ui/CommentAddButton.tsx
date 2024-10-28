import { Plus } from "lucide-react"
import { useCommentContext } from "../../../entities/comment/model/CommentContext"
import { Button } from "../../../shared/ui"

interface Props {
  postId: number
}

export const CommentAddButton = ({ postId }: Props) => {
  const { setNewComment, setShowAddCommentDialog } = useCommentContext()

  return (
    <Button
      size="sm"
      onClick={() => {
        setNewComment((prev) => ({ ...prev, postId }))
        setShowAddCommentDialog(true)
      }}
    >
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  )
}
