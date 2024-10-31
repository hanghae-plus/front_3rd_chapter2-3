import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useMutationCommentAdd } from "../../comment/api/useMutationCommentAdd"
import { useCommentsStore } from "../../comment/model/commentStore"

export const CommentAddModal = () => {
  const { showAddCommentDialog, setShowAddCommentDialog, newComment, setNewComment } = useCommentsStore()

  const { mutate: addCommentMutate } = useMutationCommentAdd()
  const handleAddComment = () => {
    addCommentMutate(newComment)

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
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
