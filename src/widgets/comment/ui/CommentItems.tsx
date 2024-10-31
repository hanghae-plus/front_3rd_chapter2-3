import { CommentItem } from "../../../features/comment-item/ui/CommentItem"
import { useQueryComments } from "../../../features/comment/api/useQueryComments"

interface Props {
  postId: number
}

export const CommentItems = ({ postId }: Props) => {
  const { data } = useQueryComments(postId)

  return (
    <div className="space-y-1">
      {data?.comments.map((comment) => <CommentItem key={comment.id} postId={postId} comment={comment} />)}
    </div>
  )
}
