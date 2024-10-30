import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { Button, DialogHeader, Textarea } from "../../../shared/ui"
import { Comment } from "../../../entities/comments/model/types"

interface CommentUpdateDialogProps {
  isShow: boolean
  handleDialog: () => void
  selectedComment: Comment | null
  setSelectedComment: (comment: Comment | null) => void
  updateComment: () => void
}

export const CommentUpdateDialog = ({
  isShow,
  handleDialog,
  selectedComment,
  setSelectedComment,
  updateComment,
}: CommentUpdateDialogProps) => {
  return (
    <Dialog open={isShow} onOpenChange={handleDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => selectedComment && setSelectedComment({ ...selectedComment, body: e.target.value })}
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
