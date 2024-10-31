import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Comments } from "../../../entities/comments/model/Comments"
import { Button } from "../../../shared/ui"
import { useDeleteComment, useLikeComment } from "../api/commentsFeaturesApi"
import useComment from "../hooks/useComments"
import CommentUserInfo from "../../../entities/comments/ui/CommentUserInfo"

interface CommentsSectionProps {
  postId: number
}
const CommentsSection = ({ postId }: CommentsSectionProps) => {
  const {
    setComments,
    setNewComment,
    setShowAddCommentDialog,
    comments,
    setSelectedComment,
    setShowEditCommentDialog,
  } = useComment()

  const { mutate: likeComment } = useLikeComment()

  function handleLikeComment(commentId: number, postId: number) {
    const comment = comments[postId]?.find((c) => c.id === commentId)
    const updateLikes = comment ? comment.likes + 1 : 0

    likeComment(
      { id: commentId, updateLikes },
      {
        onSuccess: (data: Comments) => {
          setComments((prev) => ({
            ...prev,
            [postId]: prev[postId].map((c) => (c.id === data.id ? data : c)),
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
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            if (postId) {
              setNewComment((prev) => ({ ...prev, postId }))
              setShowAddCommentDialog(true)
            }
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
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
        ))}
      </div>
    </div>
  )
}

export default CommentsSection
