import { Comment } from "../model/types"
import HighlightText from "../../../shared/ui/HighlightText"
import { Button } from "../../../shared/ui/Button"
import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { useComment } from "../model/useComment"
import { patchCommentFetch } from "../../../entities/comment/api"
import useMutationDeleteComment from "../api/useMutationDeleteComment"

interface Props {
  comment: Comment
  searchQuery: string
  postId: number
}

const CommentArea = ({ comment, searchQuery, postId }: Props) => {
  const { comments, setComments, setSelectedComment, setShowEditCommentDialog } = useComment()
  const { mutate: mutateDeleteComment } = useMutationDeleteComment(comment.id, postId)

  // 댓글 삭제
  const handleDeleteComment = async () => {
    mutateDeleteComment()
  }
  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    try {
      const likes = comments[postId].find((c) => c.id === id)?.likes || 0 + 1
      const data = await patchCommentFetch(id, likes)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
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
        <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
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

export default CommentArea
