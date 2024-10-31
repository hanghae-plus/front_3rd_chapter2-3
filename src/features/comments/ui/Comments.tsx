import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { usePost } from "../../../entities/post/model/post"
import { Button, makeHighlightText } from "../../../shared/ui"
import { useComments } from "../../../entities/comments/model"
import { useQueryModCommentLike } from "../api/modComment"
import { useSearchQuery } from "../../../entities/post/model/searchQuery"
import { useQueryDeleteComment } from "../api/deleteComment"

export default function Comments() {
  // entities
  const { selectedPost } = usePost()
  const { comments, setNewComment, setShowAddCommentDialog, setSelectedComment, setShowEditCommentDialog } =
    useComments()
  const { searchQuery } = useSearchQuery()

  // tanstack
  const { mutate: commentLikeMod } = useQueryModCommentLike()
  const { mutate: commentDelete } = useQueryDeleteComment()

  // data
  const postId = selectedPost?.id

  if (!postId) {
    console.log("postId is not defined.", { postId })
    return <>postId Error...</>
  }

  // 댓글 좋아요
  const handleLikeComment = async (commentId: number, postId: number) => {
    commentLikeMod({ commentId, comments: comments[postId] })
  }

  // 댓글 삭제
  const handleDeleteComment = async (commentId: number) => {
    commentDelete(commentId)
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{makeHighlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id, postId)}>
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
              <Button variant="ghost" size="sm" onClick={() => handleDeleteComment(comment.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
