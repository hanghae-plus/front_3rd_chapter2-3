import { useState } from "react"
import {
  useComments,
  useDeleteCommentMutation,
} from "../../../lib/hooks/useCommentsQuery"
import { Button } from "../../../../../shared"
import { Plus } from "lucide-react"
import { CommentItem } from "../Comments/CommentItem"
import { Comment } from "../../../model/types"
import { AddCommentDialog } from "../CommentDialogs/AddCommentDialog"
import { EditCommentDialog } from "../CommentDialogs/EditCommentDialog"

interface CommentListProps {
  postId: number
  searchQuery?: string
}

export const CommentList = ({ postId, searchQuery }: CommentListProps) => {
  const { data: commentsData, isLoading } = useComments(postId)
  const { mutate: deleteComment } = useDeleteCommentMutation()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  if (isLoading) {
    return <div>댓글 로딩 중...</div>
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={() => setShowAddDialog(true)}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {commentsData?.comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            searchQuery={searchQuery}
            onLike={() => {
              console.log("Like comment!")
            }}
            onEdit={() => {
              setSelectedComment(comment)
              setShowEditDialog(true)
            }}
            onDelete={() => deleteComment(comment.id)}
          />
        ))}
      </div>

      <AddCommentDialog
        postId={postId}
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />

      <EditCommentDialog
        comment={selectedComment}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
      />
    </div>
  )
}
