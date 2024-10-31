import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { CommentPayload } from "../../../entities/comments/model/types"

interface CommentAddDialogProps {
  isShow: boolean
  handleDialog: () => void
  newComment: CommentPayload
  setNewComment: (comment: CommentPayload) => void
  addComment: () => void
}

export const CommentAddDialog = ({
  isShow,
  handleDialog,
  newComment,
  setNewComment,
  addComment,
}: CommentAddDialogProps) => {
  return (
    <Dialog open={isShow} onOpenChange={handleDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
