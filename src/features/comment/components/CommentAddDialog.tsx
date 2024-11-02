import { ChangeEvent, useState } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { AddCommentBody } from "../../../entities/comment/model/types"

export interface CommentAddDialogProps {
  open: boolean
  comment: AddCommentBody
  onOpenChange: (open: boolean) => void
  onSubmit: (comment: AddCommentBody) => void
}

const CommentAddDialog = ({ open, comment, onOpenChange, onSubmit }: CommentAddDialogProps) => {
  const { postId, userId, body } = comment

  const [value, setValue] = useState<string>(body ?? "")

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value)
  }

  const handleSubmit = () => {
    onSubmit({ postId, userId, body: value })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={value} onChange={handleTextareaChange} />
          <Button onClick={handleSubmit}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentAddDialog
