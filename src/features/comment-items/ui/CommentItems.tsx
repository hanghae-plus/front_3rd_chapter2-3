import { CommentItem } from "../../comment-item/ui/CommentItem"
import { useCommentsQuery } from "../../comment/api/useQueryComments"

interface Props {
  postId: number
}

export const CommentItems = ({ postId }: Props) => {
  const { data } = useCommentsQuery(postId)

  return (
    <div className="space-y-1">
      {data?.comments.map((comment) => <CommentItem key={comment.id} postId={postId} comment={comment} />)}
    </div>
  )
}
