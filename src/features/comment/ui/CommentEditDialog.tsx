import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useCommentDialog } from "../model/useCommentDialog.ts"
import { useComments } from "../model/useComment.ts"
import { useUpdateCommentMutation } from "../api/mutations.ts"

export default function CommentEditDialog() {
  const { mutate: updateComment } = useUpdateCommentMutation()
  const { selectedComment, setSelectedComment, showEditCommentDialog, setShowEditCommentDialog } = useCommentDialog()

  const submitUpdateCommentForm = async () => {
    if (selectedComment) {
      updateComment(selectedComment)
      setShowEditCommentDialog(false)
    }
  }

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
          />
          <Button onClick={submitUpdateCommentForm}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
