// 댓글 수정 대화상자
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../shared/ui"
import { Comment } from "../../entities/comment/model/type"
import { useComment } from "../../features/comment/model/store"

const CommentUpdateDialog = () => {
  const { selectedComment, updateComment, setShowEditCommentDialog, showEditCommentDialog, setSelectedComment } =
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
            onChange={(e) => setSelectedComment({ ...(selectedComment as Comment), body: e.target.value })}
          />
          {selectedComment && <Button onClick={() => updateComment(selectedComment)}>댓글 업데이트</Button>}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentUpdateDialog
