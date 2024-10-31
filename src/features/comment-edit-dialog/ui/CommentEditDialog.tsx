import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui"
import type { Comment } from "@/shared/types"
import { DialogProps } from "@/shared/ui/Dialog"

interface Props {
  open: boolean
  onOpenChange: DialogProps["onOpenChange"]
  selectedComment: Comment | null
  onChangeBody: React.ChangeEventHandler<HTMLTextAreaElement>
  onClickCommentEditButton: React.MouseEventHandler<HTMLButtonElement>
}

const CommentEditDialog = ({ open, onOpenChange, selectedComment, onChangeBody, onClickCommentEditButton }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={selectedComment?.body || ""} onChange={onChangeBody} />
          <Button onClick={onClickCommentEditButton}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentEditDialog
