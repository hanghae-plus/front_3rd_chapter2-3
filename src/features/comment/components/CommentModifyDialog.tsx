import { ChangeEvent, useState } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { Comment } from "../../../entities/comment/model/types"

export interface CommentModifyDialogProps {
  open: boolean
  comment: Comment | null
  onOpenChange: (open: boolean) => void
  onSubmit: (comment: Comment) => void
}

const CommentModifyDialog = ({ open, comment, onOpenChange, onSubmit }: CommentModifyDialogProps) => {
  const [value, setValue] = useState<string>(comment?.body ?? "")

  if (!comment) return

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = () => {
    onSubmit({ ...comment, body: value })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={value} onChange={handleTextareaChange} />
          <Button onClick={handleSubmit}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentModifyDialog
