import { Edit2, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import HighlightText from "../../../widgets/HighlightText"
import { CommentLikeButton } from "../../../entities/comment/ui/CommentLikeButton"
import { useComment } from "../model/store"
import { PostId } from "../../../entities/post/model/type"
import { Comment } from "../../../entities/comment/model/type"
import { useSearch } from "../../../shared/model/useSearch"

export const CommentItem = ({ comment, postId }: { comment: Comment; postId: PostId }) => {
  const { setSelectedComment, setShowEditCommentDialog, deleteComment } = useComment()
  const { searchQuery } = useSearch()
  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">
          <HighlightText text={comment.body} highlight={searchQuery} />
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <CommentLikeButton comment={comment} postId={postId} />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedComment(comment)
            setShowEditCommentDialog(true)
          }}
        >
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
