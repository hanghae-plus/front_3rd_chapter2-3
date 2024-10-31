import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useMutationCommentAdd } from "../../comment/api/useMutationCommentAdd"
import { useCommentAddModalStore } from "../../comment/model/commentAddModalStore"

export const CommentAddModal = () => {
  const { showAddCommentModal, setShowAddCommentModal, newComment, setNewComment } = useCommentAddModalStore()

  const { mutate: addCommentMutate } = useMutationCommentAdd()
  const handleAddComment = () => {
    addCommentMutate(newComment)

    setShowAddCommentModal(false)
    setNewComment({ body: "", postId: null, userId: 1 })
  }

  return (
    <Dialog open={showAddCommentModal} onOpenChange={setShowAddCommentModal}>
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
