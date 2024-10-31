import { Comment } from "../model/types"
import HighlightText from "../../../shared/ui/HighlightText"
import { Button } from "../../../shared/ui/Button"
import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { useComment } from "../model/useComment"
import useMutationDeleteComment from "../api/useMutationDeleteComment"
import useMutationLikeComment from "../api/useMutationLikeComment"

interface Props {
  comment: Comment
  searchQuery: string
  postId: number
}

const CommentComponent = ({ comment, searchQuery, postId }: Props) => {
  const { setSelectedComment, setShowEditCommentDialog } = useComment()
  const { mutate: mutateDeleteComment } = useMutationDeleteComment(comment.id, postId)
  const { mutate: mutateLikeComment } = useMutationLikeComment(comment.id, postId)

  // 댓글 삭제
  const handleDeleteComment = () => {
    mutateDeleteComment()
  }
  // 댓글 좋아요
  const handleLikeComment = () => {
    mutateLikeComment()
  }
  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">
          <HighlightText text={comment.body} highlight={searchQuery} />
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
          onClick={() => {
            setSelectedComment(comment)
            setShowEditCommentDialog(true)
          }}
        >
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDeleteComment}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}

export default CommentComponent
