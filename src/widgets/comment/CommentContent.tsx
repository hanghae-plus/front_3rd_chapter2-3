import { PostId } from "../../entities/post/model/type"
import { useComment } from "../../features/comment/model/store"
import { CommentItem } from "../../features/comment/ui/CommentITem"
import { CommentAddButton } from "../../features/comment/ui/CommentAddButton"

export const CommentContent = ({ postId }: { postId: PostId }) => {
  const { comments } = useComment()
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <CommentAddButton postId={postId} />
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => <CommentItem key={comment.id} comment={comment} postId={postId} />)}
      </div>
    </div>
  )
}
