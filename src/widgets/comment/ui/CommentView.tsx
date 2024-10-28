import { useEffect } from "react"
import { useCommentContext } from "../../../entities/comment/model/CommentContext"
import { CommentAddModal } from "../../../features/comment-add/ui/CommentAddModal"
import { CommentEditModal } from "../../../features/comment-edit/ui/CommentEditModal"
import { CommentItem } from "../../../features/comment-item/ui/CommentItem"
import { CommentAddButton } from "../../../features/comment-add/ui/CommentAddButton"

interface Props {
  postId: number
}

export const CommentView = ({ postId }: Props) => {
  const { comments, getComments } = useCommentContext()

  useEffect(() => {
    getComments(postId)
  }, [getComments, postId])

  return (
    <>
      <CommentAddModal />
      <CommentEditModal />

      <div className="mt-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">댓글</h3>
          <CommentAddButton postId={postId} />
        </div>

        <div className="space-y-1">
          {comments[postId]?.map((comment) => <CommentItem key={comment.id} postId={postId} comment={comment} />)}
        </div>
      </div>
    </>
  )
}
