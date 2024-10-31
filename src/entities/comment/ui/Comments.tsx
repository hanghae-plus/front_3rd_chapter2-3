import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"
import { Comment } from "../model/types"
import { CommentView } from "./CommentView"
import { useCommentsQuery } from "../../../features/comment/model/commentStore"
import { useDialog } from "../../../features/post/model/dialogStore"

export const Comments: React.FC<{
  postId: number
}> = ({ postId }) => {
  const { setShowCommentAddDialog } = useDialog()
  const { data: commentsData, isLoading } = useCommentsQuery(postId)

  const handleCommentAddDialogOpen = () => {
    setShowCommentAddDialog(true)
  }

  return (
    <>
      {!isLoading && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">댓글</h3>
            <Button
              size="sm"
              onClick={handleCommentAddDialogOpen}
            >
              <Plus className="w-3 h-3 mr-1" />
              댓글 추가
            </Button>
          </div>
          <div className="space-y-1">
            {commentsData?.commentsById[postId]?.map((comment: Comment) => (
              <CommentView
                key={comment.id}
                postId={postId}
                comment={comment}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
