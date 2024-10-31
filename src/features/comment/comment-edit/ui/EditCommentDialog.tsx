import { type FC } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/components/dialog"
import { Textarea } from "@/shared/ui/components/textarea"
import { Button } from "@/shared/ui/components/button"
import { useUpdateComment } from "../model/use-update-comment"
import type { Comment } from "@/entities/comment/model/types"

interface EditCommentDialogProps {
  comment: Comment | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const EditCommentDialog: FC<EditCommentDialogProps> = ({ 
  comment, 
  open, 
  onOpenChange 
}) => {
  const { mutate: updateComment, editingComment, setEditingComment } = useUpdateComment({
    onSuccess: () => onOpenChange(false)
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={editingComment?.body || ""}
            onChange={(e) => setEditingComment({ ...editingComment, body: e.target.value })}
          />
          <Button onClick={() => editingComment && updateComment(editingComment)}>
            댓글 업데이트
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}