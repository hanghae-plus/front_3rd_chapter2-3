import { useState } from "react"
import {
  useComments,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} from "../../../lib/hooks/useCommentsQuery"
import { AddCommentDialog } from "../CommentDialogs/AddCommentDialog"
import { EditCommentDialog } from "../CommentDialogs/EditCommentDialog"
import { CommentHeader } from "../../../../../entities/comment/ui/components"
import { CommentsList } from "../../../../../entities/comment/ui/components/CommentList/CommentsList"
import { Comment } from "../../../model/types"

interface CommentListProps {
  postId: number
  searchQuery?: string
}

export const CommentList = ({ postId, searchQuery }: CommentListProps) => {
  const { data: commentsData, isLoading } = useComments(postId)
  const { mutate: deleteComment } = useDeleteCommentMutation()
  const { mutate: likeComment } = useLikeCommentMutation(postId)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  if (isLoading) {
    return <div>댓글 로딩 중...</div>
  }

  return (
    <div className="mt-2">
      <CommentHeader onAddClick={() => setShowAddDialog(true)} />
      <CommentsList
        comments={commentsData?.comments || []}
        searchQuery={searchQuery}
        onLike={likeComment}
        onEdit={(comment) => {
          setSelectedComment(comment)
          setShowEditDialog(true)
        }}
        onDelete={deleteComment}
      />

      <AddCommentDialog
        postId={postId}
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
      />

      <EditCommentDialog
        comment={selectedComment}
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        postId={postId}
      />
    </div>
  )
}
