import { useCommentStore } from "../../comment/model/store.ts"
import CommentList from "../../post-detail-comment-list/ui/CommentList.tsx"
import CommentAddButton from "../../post-detail-comment-add/ui/CommentAddButton.tsx"

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
        <CommentAddButton />
      </div>
      <CommentList />
    </div>
  )
}

export default CommentContent
