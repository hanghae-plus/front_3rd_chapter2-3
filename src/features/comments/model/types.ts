export interface EditCommentDialogProps {
  showEditCommentDialog: boolean
  setShowEditCommentDialog: (show: boolean) => void
  selectedComment: Comment
  setSelectedComment: (comment: Comment) => void
}
