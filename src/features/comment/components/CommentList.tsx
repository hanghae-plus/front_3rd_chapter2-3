import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"
import CommentItem from "./CommentItem"
import { useComments } from "../../../entities/comment/api/get-comment"
import { AddCommentBody, Comment } from "../../../entities/comment/model/types"
import { useAddComment } from "../api/create-comment"
import { useUpdateComment } from "../api/update-comment"
import { useDeleteComment } from "../api/delete-comment"
import { useState } from "react"
import { useUpdateLike } from "../../like/api/update-like"
import CommentModifyDialog from "./CommentModifyDialog"
import CommentAddDialog from "./CommentAddDialog"

export interface CommentListProps {
  postId: Comment["postId"]
  searchQuery: string
}

const CommentList = ({ postId, searchQuery }: CommentListProps) => {
  const {
    data: { comments },
  } = useComments({ postId })
  const { mutate: addComment } = useAddComment()
  const { mutate: updateComment } = useUpdateComment()
  const { mutate: deleteComment } = useDeleteComment()

  // Like
  const { mutate: updateLike } = useUpdateLike()

  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [newComment, setNewComment] = useState({ body: "", postId: 0, userId: 1 })

  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)

  const handleAddCommentButton = () => {
    setNewComment((prev) => ({ ...prev, postId }))
    setShowAddCommentDialog(true)
  }

  // 댓글 추가
  const handleAddComment = (body: AddCommentBody) => {
    addComment(body, {
      onSuccess: () => {
        setShowAddCommentDialog(false)
        setNewComment({ body: "", postId: 0, userId: 1 })
      },
      onError: (error) => {
        console.error("댓글 추가 오류:", error)
      },
    })
  }

  // 댓글 업데이트
  const handleUpdateComment = (comment: Comment) => {
    updateComment(
      { comment },
      {
        onSuccess: () => {
          setShowEditCommentDialog(false)
        },
        onError: (error) => {
          console.error("댓글 업데이트 오류:", error)
        },
      },
    )
  }

  // 댓글 삭제
  const handleDeleteComment = (id: Comment["id"], postId: Comment["postId"]) => {
    deleteComment(
      { id, postId },
      {
        onError: (error) => {
          console.error("댓글 삭제 오류:", error)
        },
      },
    )
  }

  // 댓글 좋아요
  const handleLikeComment = (id: Comment["id"], postId: Comment["postId"]) => {
    const targetComment = comments.find((comment) => comment.id === id && comment.postId === postId)

    if (!targetComment) return

    updateLike(
      { id, postId, likes: targetComment.likes + 1 },
      {
        onError: (error) => {
          console.error("댓글 좋아요 오류:", error)
        },
      },
    )
  }

  return (
    <>
      <div className="mt-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold">댓글</h3>
          <Button size="sm" onClick={handleAddCommentButton}>
            <Plus className="w-3 h-3 mr-1" />
            댓글 추가
          </Button>
        </div>

        <div className="space-y-1">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              searchQuery={searchQuery}
              onLikeClick={handleLikeComment}
              onDeleteClick={handleDeleteComment}
              onEditClick={(comment) => {
                setSelectedComment(comment)
                setShowEditCommentDialog(true)
              }}
            />
          ))}
        </div>
      </div>

      {/* 댓글 추가 대화상자 */}
      <CommentAddDialog
        open={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
        comment={newComment}
        onSubmit={handleAddComment}
      />

      {/* 댓글 수정 대화상자 */}
      <CommentModifyDialog
        open={showEditCommentDialog}
        comment={selectedComment}
        onOpenChange={setShowEditCommentDialog}
        onSubmit={handleUpdateComment}
      />
    </>
  )
}

export default CommentList
