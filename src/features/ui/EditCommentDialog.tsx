import { useAtom } from "jotai"
import { Button } from "../../shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/dialog"
import { Textarea } from "../../shared/ui/Textarea"
import { selectedCommentAtom, showEditCommentDialogAtom } from "../../app/atom"
import useManageComments from "../useManageComments"

const EditCommentDialog = () => {
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const { updateComment } = useManageComments()

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
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditCommentDialog
