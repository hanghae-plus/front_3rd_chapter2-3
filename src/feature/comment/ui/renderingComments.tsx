import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui/button/Button"
import { useState, Dispatch, SetStateAction, useEffect } from "react"
import { likeComment } from "../model/likeComment"
import { highlightText } from "../../../shared/ui"
import { deleteComment } from "../model/deleteComment"
import { Comment } from "../types/types"
import { fetchComments } from "../model/fetchComment"

interface Props {
  postId: number | null
  comments: Comment[]
  setComments: Dispatch<SetStateAction<Comment[]>>
  searchQuery: unknown
}

export const CommentSection = ({ postId, comments, setComments, searchQuery }: Props) => {
  console.log("postId,", postId)

  const [newComment, setNewComment] = useState<Comment>({ body: "", postId: null, userId: 1 })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState<boolean>(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState<boolean>(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  useEffect(() => {
    const fetchData = fetchComments(postId)
    console.log("fetchData", fetchData)

    setNewComment(fetchData)
  }, [newComment])

  // 댓글 좋아요 핸들러
  const handleLikeComment = async (commentId: number) => {
    try {
      const updatedComment = await likeComment(commentId)
      if (updatedComment) {
        setComments((prev) => prev.map((comment) => (comment.id === updatedComment.id ? updatedComment : comment)))
      }
    } catch (error) {
      console.error("댓글 좋아요 처리 중 오류 발생:", error)
    }
  }

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId: number) => {
    try {
      const isDeleted = await deleteComment(commentId)
      if (isDeleted) {
        setComments((prev) => prev.filter((comment) => comment.id !== commentId))
      }
    } catch (error) {
      console.error("댓글 삭제 처리 중 오류 발생:", error)
    }
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
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => handleLikeComment(comment.id)}>
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

export default CommentSection
