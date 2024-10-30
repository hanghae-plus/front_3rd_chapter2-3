import { Button } from "../../../shared/ui"
import { Plus } from "lucide-react"
import { useCommentDialog } from "../model/useCommentDialog.ts"
import { useComments } from "../model/useComment.ts"
import CommentItem from "./CommentItem.tsx"

interface Props {
  postId: number
}

export default function CommentList({ postId }: Props) {
  const { comments } = useComments()
  const { setNewComment, setShowAddCommentDialog } = useCommentDialog()

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
