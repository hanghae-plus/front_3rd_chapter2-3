import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import type { NewComment } from "@/shared/types"
import { DialogProps } from "@/shared/ui"

interface Props {
  open: boolean
  onOpenChange: DialogProps["onOpenChange"]
  newComment: NewComment
  onChangeBody: React.ChangeEventHandler<HTMLTextAreaElement>
  onClickCommentAddButton: React.MouseEventHandler<HTMLButtonElement>
}

const CommentAddDialog = ({ open, onOpenChange, newComment, onChangeBody, onClickCommentAddButton }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={newComment.body} onChange={onChangeBody} />
          <Button onClick={onClickCommentAddButton}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentAddDialog
