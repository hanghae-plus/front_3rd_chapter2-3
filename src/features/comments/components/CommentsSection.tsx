import { Plus } from "lucide-react"
import useComment from "../../../shared/hooks/useComment"
import { Button } from "../../../shared/ui"
import CommentsEvents from "./CommentsEvents"

interface CommentsSectionProps {
  postId: number
}
const CommentsSection = ({ postId }: CommentsSectionProps) => {
  const { setNewComment, setShowAddCommentDialog, comments } = useComment()

  function handleShowAddCommentDialog() {
    setNewComment((prev) => ({ ...prev, postId }))
    setShowAddCommentDialog(true)
    setNewComment((prev) => ({
      ...prev,
      body: "",
    }))
  }
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            if (postId) {
              handleShowAddCommentDialog()
            }
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => <CommentsEvents comment={comment} postId={postId} />)}
      </div>
    </div>
  )
}

export default CommentsSection
