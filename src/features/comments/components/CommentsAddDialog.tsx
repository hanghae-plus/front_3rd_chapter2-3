import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui/"
import { useAddComment } from "../api/commentsFeaturesApi"
import useComment from "../hooks/useComments"

//댓글 추가 대화상자
const CommentsAddDialog = () => {
  const { showAddCommentDialog, setShowAddCommentDialog, newComment, setNewComment, setComments } = useComment()
  function handleShowAddCommentDialog() {
    setShowAddCommentDialog(false)
  }

  function handleChangeNewComments(field: string, value: string) {
    setNewComment((prev) => ({ ...prev, [field]: value }))
  }

  const { mutate: addComment } = useAddComment()

  function handleAddComment() {
    addComment(newComment, {
      onSuccess: (data) => {
        setComments((prev) => ({
          ...prev,
          [data.postId]: [...(prev[data.postId] || []), data],
        }))
        setShowAddCommentDialog(false)
        setNewComment({ body: "", postId: null, userId: 1 })
      },
      onError: (error) => {
        console.error("Failed to like comment:", error)
      },
    })
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={handleShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => handleChangeNewComments("body", e.target.value)}
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentsAddDialog
