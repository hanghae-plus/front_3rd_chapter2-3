import { Plus } from "lucide-react"
import { PostId } from "../../entities/post/model/type"
import { useComment } from "../../features/comment/model/store"
import { Button } from "../../shared/ui"
import { CommentItem } from "./CommentITem"

export const CommentContent = ({ postId }: { postId: PostId }) => {
  const { setNewComment, setShowAddCommentDialog, comments } = useComment()
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
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
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => <CommentItem comment={comment} postId={postId} />)}
      </div>
    </div>
  )
}
