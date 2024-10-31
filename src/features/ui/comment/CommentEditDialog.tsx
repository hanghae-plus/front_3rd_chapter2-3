import { Dialog, DialogContent, DialogHeader, DialogTitle, Textarea, Button } from "../../../shared/ui"
import { useComment } from "../../model/comment/useComment"

export const CommentEditDialog = () => {
  const { showEditCommentDialog, setShowEditCommentDialog, selectedComment, setSelectedComment, handleUpdateComment } =
    useComment()
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
            onChange={(e) => setSelectedComment({ ...selectedComment!, body: e.target.value })}
          />
          <Button onClick={() => handleUpdateComment(selectedComment!)}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
