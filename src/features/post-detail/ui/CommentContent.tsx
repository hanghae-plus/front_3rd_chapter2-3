import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { Plus } from "lucide-react"
import { useCommentStore } from "../../comment/model/store.ts"
import CommentList from "../../comment-list/ui/CommentList.tsx"

interface Props {
  postId: number
}

const CommentContent = ({ postId }: Props) => {
  const { setPostId } = useCommentStore.getState()
  setPostId(postId)

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          // onClick={() => {
          //   setNewComment((prev) => ({ ...prev, postId }))
          //   setShowAddCommentDialog(true)
          // }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <CommentList />
    </div>
  )
}

export default CommentContent
