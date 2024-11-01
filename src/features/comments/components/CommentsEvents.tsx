import { Comments } from "../../../entities/comments/model/Comments"
import CommentUserInfo from "../../../entities/comments/ui/CommentUserInfo"
import { useComment } from "../../../shared/hooks"
import { Button } from "../../../shared/ui"
import { Edit2, ThumbsUp, Trash2 } from "lucide-react"
import { useDeleteComment, useLikeComment } from "../api/commentsFeaturesApi"

interface CommentsEventsProps {
  comment: Comments
  postId: number
}
const CommentsEvents = ({ comment, postId }: CommentsEventsProps) => {
  const { setComments, comments, setSelectedComment, setShowEditCommentDialog } = useComment()
  const { mutate: likeComment } = useLikeComment()

  function handleLikeComment(commentId: number, postId: number) {
    const comment = comments[postId]?.find((c) => c.id === commentId)

    const updateLikes = comment ? comment.likes + 1 : 0

    likeComment(
      { id: commentId, updateLikes },
      {
        onSuccess: () => {
          setComments((prev) => ({
            ...prev,
            [postId]: prev[postId].map((c) => (c.id === commentId ? { ...c, likes: updateLikes } : c)),
          }))
        },
        onError: (error) => {
          console.error("Failed to like comment:", error)
        },
      },
    )
  }

  const { mutate: deleteComment } = useDeleteComment()

  function handleDeleteComment(commentId: number, postId: number) {
    deleteComment(commentId, {
      onSuccess: () => {
        setComments((prev) => ({
          ...prev,
          [postId]: prev[postId].filter((comment) => comment.id !== commentId),
        }))
      },
      onError: (error) => {
        console.error("Failed to like comment:", error)
      },
    })
  }

  function handleShowEditCommentDialog(comment: Comments) {
    setSelectedComment(comment)
    setShowEditCommentDialog(true)
  }

  return (
    <>
      {" "}
      <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
        <CommentUserInfo comment={comment} />

        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id, postId)}>
            <ThumbsUp className="w-3 h-3" />
            <span className="ml-1 text-xs">{comment.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              handleShowEditCommentDialog(comment)
            }}
          >
            <Edit2 className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id, postId)}>
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default CommentsEvents
