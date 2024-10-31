import { ThumbsUp, Edit2, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui"
import { HighlightedText } from "../../../shared/ui/HighlightedText"
import { Comment } from "../model/types"
import { useCommentMutations, useComments } from "../../../features/comment/model/commentStore"
import { useRouterQueries } from "../../../features/post/model/routerStore"
import { useDialog } from "../../../features/post/model/dialogStore"

export const CommentView: React.FC<{
  postId: number
  comment: Comment
}> = ({ postId, comment }) => {
  const { searchQuery, } = useRouterQueries()
  const { setShowCommentUpdateDialog } = useDialog()
  const { likeComment, deleteComment } = useCommentMutations(postId)
  const { setSelectedComment } = useComments()

  const handleLikeComment = () => {
    likeComment.mutate({ commentId: comment.id, likes: comment.likes })
  }

  const handleCommentDelete = () => {
    deleteComment.mutate(comment.id)
  }

  const handleCommentUpdateDialogOpen = () => {
    setSelectedComment(comment)
    setShowCommentUpdateDialog(true)
  }

  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">
          <HighlightedText text={comment.body} highlight={searchQuery} />
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={handleLikeComment}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCommentUpdateDialogOpen}
        >
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleCommentDelete}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
