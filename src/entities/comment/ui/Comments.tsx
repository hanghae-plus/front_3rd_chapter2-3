import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"
import { Comment } from "../model/types"
import { CommentView } from "./CommentView"

export const Comments: React.FC<{
  comments: Record<number, Comment[]>
  postId: number
  searchQuery: string
  setShowCommentAddDialog: (value: boolean) => void
  setSelectedComment: (comment: Comment) => void
  setShowCommentUpdateDialog: (value: boolean) => void
  likeComment: (commentId: number, postId: number) => void
  deleteComment: (commentId: number, postId: number) => void
}> = ({
  comments,
  postId,
  searchQuery,
  setShowCommentAddDialog,
  setSelectedComment,
  setShowCommentUpdateDialog,
  likeComment,
  deleteComment,
}) => {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setShowCommentAddDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <CommentView
            key={comment.id}
            postId={postId}
            comment={comment}
            searchQuery={searchQuery}
            setSelectedComment={setSelectedComment}
            setShowCommentUpdateDialog={setShowCommentUpdateDialog}
            likeComment={likeComment}
            deleteComment={deleteComment}
          />
        ))}
      </div>
    </div>
  )
}
