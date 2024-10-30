import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useComments } from "../model/useComment.ts"
import { useCommentDialog } from "../model/useCommentDialog.ts"

export default function CommentAddDialog() {
  const { addComment } = useComments()
  const { newComment, setNewComment, showAddCommentDialog, setShowAddCommentDialog } = useCommentDialog()

  const submitAddCommentForm = async () => {
    addComment(newComment)

    setShowAddCommentDialog(false)
    setNewComment({ body: "", postId: null, userId: 1 })
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
          <Button onClick={submitAddCommentForm}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
