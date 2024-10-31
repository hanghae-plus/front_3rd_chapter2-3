import { Plus } from "lucide-react"
import { Button } from "../../../shared/ui"
import CommentItem from "./CommentItem"

const CommentList = () => {
  const handleAddCommentButton = () => {
    // setNewComment((prev) => ({ ...prev, postId }))
    // setShowAddCommentDialog(true)
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={handleAddCommentButton}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>

      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
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
  )
}

export default CommentList
