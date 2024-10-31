import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui/button/Button"
import { highlightText } from "../../../shared/utils/highlightText"
import { useAtom } from "jotai"
import { searchQueryAtom } from "../../post/model/postAtoms"
import {
  commentsAtom,
  newCommentAtom,
  selectedCommentAtom,
  showAddCommentDialogAtom,
  showEditCommentDialogAtom,
} from "../model/commentAtom"
import { commentFetch } from "../model/commentFetch"
import { useEffect } from "react"
import { Comment } from "../../../entities/types/commentTypes"

// 컴포넌트 prop 타입 정의
interface CommentRenderProps {
  postId: number
}

// 댓글 렌더링 컴포넌트
export const CommentRender = ({ postId }: CommentRenderProps) => {
  const [searchQuery] = useAtom(searchQueryAtom)
  const [comments, setComments] = useAtom(commentsAtom)

  const [, setSelectedComment] = useAtom(selectedCommentAtom)
  const [, setNewComment] = useAtom(newCommentAtom)
  const [, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const getComment = await commentFetch(postId)
        if (getComment) {
          setComments((prev) => ({ ...prev, [postId]: getComment }))
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error)
      }
    }
    fetchComments()
  }, [postId, setComments])

  const handleLikeComment = async (commentId: number) => {
    const targetComment = comments[postId].find((c) => c.id === commentId)
    const likeUpdate = targetComment?.likes + 1

    if (!targetComment) return

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: likeUpdate }),
      })
      const data: Comment = await response.json()

      console.log("data", data)

      if (!data) {
        return
      }
      prev[postId].map((comment) => (comment.id === data.id ? data : comment))

      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
    } catch (error) {
      console.error("Failed to like comment:", error)
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    try {
      await fetch(`/api/comments/${commentId}`, { method: "DELETE" })
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== commentId),
      }))
    } catch (error) {
      console.error("Failed to delete comment:", error)
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
        {comments[postId]
          ? comments[postId].map((comment) => (
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
            ))
          : ""}
      </div>
    </div>
  )
}
