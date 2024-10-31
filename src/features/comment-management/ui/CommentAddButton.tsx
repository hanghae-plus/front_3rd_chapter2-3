import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui/button"
import useCommentStore from "../../../entities/comment/model/useCommentStore"

interface Props {
  postId: any
}

const CommentAddButton = ({ postId }: Props) => {
  const { showAddCommentDialog, newComment, setNewComment, setShowAddCommentDialog } = useCommentStore.getState()
  console.log(showAddCommentDialog)
  return (
    <Button
      size="sm"
      onClick={() => {
        console.log("dd")
        setNewComment({ ...newComment, postId })
        setShowAddCommentDialog(true)
      }}
    >
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  )
}

export default CommentAddButton
