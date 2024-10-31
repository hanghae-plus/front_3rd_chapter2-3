import { Comment } from "../../../entities/comment/model/comment"
import { Button } from "../../../shared/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../shared/ui/Dialog"
import { Textarea } from "../../../shared/ui/Textarea"
interface Props {
  showEditCommentDialog: boolean
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
  selectedComment: Comment | null
  setSelectedComment: (selectedComment: Comment | null) => void
  updateComment: () => Promise<void>
}

export const UpdateCommentDialog = ({
  showEditCommentDialog,
  setShowEditCommentDialog,
  selectedComment,
  setSelectedComment,
  updateComment,
}: Props) => {
  if (selectedComment === null) return

  return (
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
            onChange={(e) =>
              setSelectedComment({ ...selectedComment, body: e.target.value })
            }
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
