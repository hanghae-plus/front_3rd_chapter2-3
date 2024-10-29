import { useCommentContext } from "../../comment/model/CommentContext"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"

export const CommentEditModal = () => {
  const { showEditCommentDialog, setShowEditCommentDialog, selectedComment, setSelectedComment, updateComment } =
    useCommentContext()

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
            onChange={(e) => {
              setSelectedComment({ ...selectedComment!, body: e.target.value })
            }}
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
