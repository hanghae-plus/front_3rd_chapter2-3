import { Dialog, DialogContent, DialogHeader, DialogTitle, Textarea, Button } from "../../../shared/ui"
import { useComment } from "../../../shared/model/useComment"

export const CommentAddDialog = () => {
  const { showAddCommentDialog, setShowAddCommentDialog, newComment, setNewComment, handleAddComment } = useComment()
  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
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
          <Button onClick={() => handleAddComment(newComment)}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
