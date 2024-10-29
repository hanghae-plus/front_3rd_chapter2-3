import { useEffect } from "react"
import { useCommentContext } from "../../comment/model/CommentContext"
import { CommentItem } from "../../comment-item/ui/CommentItem"

interface Props {
  postId: number
}

export const CommentItems = ({ postId }: Props) => {
  const { comments, getComments } = useCommentContext()

  useEffect(() => {
    getComments(postId)
  }, [getComments, postId])

  return (
    <div className="space-y-1">
      {comments[postId]?.map((comment) => <CommentItem key={comment.id} postId={postId} comment={comment} />)}
    </div>
  )
}
