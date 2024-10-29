import { useEffect } from "react"
import { CommentItem } from "../../comment-item/ui/CommentItem"
import { useComments } from "../../comment/model/commentStore"

interface Props {
  postId: number
}

export const CommentItems = ({ postId }: Props) => {
  const { comments, getComments } = useComments()

  useEffect(() => {
    getComments(postId)
  }, [getComments, postId])

  return (
    <div className="space-y-1">
      {comments[postId]?.map((comment) => <CommentItem key={comment.id} postId={postId} comment={comment} />)}
    </div>
  )
}
