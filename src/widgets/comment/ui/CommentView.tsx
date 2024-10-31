import { CommentAddModal } from "../../../features/comment-add/ui/CommentAddModal"
import { CommentEditModal } from "../../../features/comment-edit/ui/CommentEditModal"
import { CommentAddButton } from "../../../features/comment-add/ui/CommentAddButton"
import { CommentItems } from "./CommentItems"

interface Props {
  postId: number
}

export const CommentView = ({ postId }: Props) => {
  return (
    <>
      <CommentAddModal />
      <CommentEditModal />

      <div className="mt-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">댓글</h3>
          <CommentAddButton postId={postId} />
        </div>

        <CommentItems postId={postId} />
      </div>
    </>
  )
}
