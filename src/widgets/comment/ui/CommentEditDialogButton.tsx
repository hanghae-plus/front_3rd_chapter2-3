import { Edit2 } from "lucide-react"
import { useState } from "react"
import { Comment } from "../../../entities/comment/model/types"
import { CommentUpdateButton } from "../../../features/comment"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
} from "../../../shared/ui"

type Props = {
  comment: Comment
}

export const CommentEditDialogButton = ({ comment }: Props) => {
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  const handleOpenDialog = () => {
    setSelectedComment(comment)
    setShowEditCommentDialog(true)
  }

  const handleCloseDialog = () => {
    setShowEditCommentDialog(false)
  }

  return (
    <>
      <Button variant="ghost" size="sm" onClick={handleOpenDialog}>
        <Edit2 className="w-3 h-3" />
      </Button>

      {/* 댓글 수정 대화상자 */}
      <Dialog
        open={showEditCommentDialog}
        onOpenChange={setShowEditCommentDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => {
                if (selectedComment) {
                  setSelectedComment({
                    ...selectedComment,
                    body: e.target.value,
                  })
                }
              }}
            />

            <CommentUpdateButton
              selectedComment={selectedComment}
              onUpdateSuccess={handleCloseDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
