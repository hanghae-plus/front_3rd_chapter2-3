import { Plus } from "lucide-react"
import { PostId } from "../../../entities/post/model/type"
import { useComment } from "../model/store"
import { Button } from "../../../shared/ui"

export const CommentAddButton = ({ postId }: { postId: PostId }) => {
  const { setNewComment, setShowAddCommentDialog } = useComment()
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
