import { useComments } from "../../../entities/comments/model"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useQueryAddComment } from "../api/addComment"

export default function AddCommentDialog() {
  // entities
  const { showAddCommentDialog, setShowAddCommentDialog, newComment, setNewComment } = useComments()
  // tanstack
  const { mutate } = useQueryAddComment()
  // handler
  const handleAddComment = async () => {
    mutate(newComment)
  }

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
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
