import { postCommentFetch } from "../../entities/comment/api"
import { useComment } from "../../features/comment/model/useComment"
import { useCommentDialog } from "../../features/comment/model/useCommentDialog"
import { Button } from "../../shared/ui/button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/dialog/Dialog"
import { Textarea } from "../../shared/ui/textarea/Textarea"

const AddCommentDialog = () => {
  const { setComments, newComment, setNewComment } = useComment()
  const { showAddCommentDialog, setShowAddCommentDialog } = useCommentDialog()

  // 댓글 추가
  const addComment = async () => {
    try {
      const data = await postCommentFetch(newComment)
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
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
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddCommentDialog
