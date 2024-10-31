import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { useParams } from "react-router-dom"
import { useComments, useLikeComment } from "../../../../features/comments/api/queries"
import { highlightText } from "../../../../shared"
import { openModals } from "../../../../shared/lib/modal/openModals"
import { Button } from "../../../../shared/ui/button"

const CommentList = ({ postId }: { postId: number }) => {
  const {
    comment: { openAddDialog, openEditDialog },
  } = openModals
  const { searchQuery } = useParams()
  const { data: comments, isSuccess } = useComments(postId)
  const { mutate: likeComment } = useLikeComment()

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            openAddDialog()
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {isSuccess &&
          comments?.comments.map((comment) => (
            <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
              <div className="flex items-center space-x-2 overflow-hidden">
                <span className="font-medium truncate">{comment.user.username}:</span>
                <span className="truncate">{highlightText(comment.body, searchQuery ?? "")}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => likeComment({ id: comment.id, postId, comments: comments?.comments })}
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span className="ml-1 text-xs">{comment.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    openEditDialog({ comment })
                  }}
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default CommentList
