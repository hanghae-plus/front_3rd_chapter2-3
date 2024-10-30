import useMutationAddComment from "../../features/comment/api/useMutationAddComment"
import { useComment } from "../../features/comment/model/useComment"
import { Button } from "../../shared/ui/button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/dialog/Dialog"
import { Textarea } from "../../shared/ui/textarea/Textarea"

const AddCommentDialog = () => {
  const { newComment, setNewComment, showAddCommentDialog, setShowAddCommentDialog } = useComment()
  const { mutate: mutateAddComment } = useMutationAddComment()

  // 댓글 추가
  const handleAddComment = () => {
    mutateAddComment()
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

export default AddCommentDialog
