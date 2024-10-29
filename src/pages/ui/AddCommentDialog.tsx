import { Button } from "../../shared/ui/button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/dialog/Dialog"
import { Textarea } from "../../shared/ui/textarea/Textarea"
import { Comments } from "../model/Comment"
import { NewComment } from "../model/NewComment"

interface Props {
  newComment: NewComment
  setComments: React.Dispatch<React.SetStateAction<Comments>>
  setShowAddCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  setNewComment: React.Dispatch<React.SetStateAction<NewComment>>
  showAddCommentDialog: boolean
}

const AddCommentDialog = ({
  newComment,
  setComments,
  setShowAddCommentDialog,
  setNewComment,
  showAddCommentDialog,
}: Props) => {
  // 댓글 추가
  const addComment = async () => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      const data = await response.json()
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
