import { useAtom } from "jotai"
import { Button } from "../../../shared/ui/button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog/Dialog"
import { Textarea } from "../../../shared/ui/input/Text"
import { selectedCommentAtom, showEditCommentDialogAtom } from "../model/commentAtom"
import { useCommentHandler } from "../hooks/useCommentHandler"

export const CommentUpdateDialog = () => {
  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)

  const { updateComment } = useCommentHandler()

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
