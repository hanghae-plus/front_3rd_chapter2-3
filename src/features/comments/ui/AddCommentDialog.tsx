import { useState } from "react"
import { Button } from "../../../shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { Textarea } from "../../../shared/ui/textarea"
import { useAddComment } from "../api/queries"

interface AddCommentDialogProps {
  isOpen: boolean
  close: () => void
  postId: number
}

const AddCommentDialog = ({ isOpen, close, postId }: AddCommentDialogProps) => {
  const [body, setBody] = useState("")
  const { mutate: addComment } = useAddComment()
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={body} onChange={(e) => setBody(e.target.value)} />
          <Button onClick={() => addComment({ body, postId, userId: 1 })}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddCommentDialog
