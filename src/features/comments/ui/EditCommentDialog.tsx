import { useState } from "react"
import { Button } from "../../../shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { Textarea } from "../../../shared/ui/textarea"
import { EditCommentDialogProps } from "../model/types"

const EditCommentDialog = ({ isOpen, close, comment }: EditCommentDialogProps) => {
  const [body, setBody] = useState(comment.body)

  //TODO: 댓글 수정 기능 구현
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <Button onClick={() => {}}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditCommentDialog
