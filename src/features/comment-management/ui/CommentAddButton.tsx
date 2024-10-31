import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui/button"

interface Props {
  setNewComment: any
  setShowAddCommentDialog: any
  postId: any
}

const CommentAddButton = ({ setNewComment, setShowAddCommentDialog, postId }: Props) => {
  return (
    <Button
      size="sm"
      onClick={() => {
        setNewComment((prev: any) => ({ ...prev, postId }))
        setShowAddCommentDialog(true)
      }}
    >
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  )
}

export default CommentAddButton
