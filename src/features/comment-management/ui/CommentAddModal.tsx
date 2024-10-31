import { useEffect } from "react"
import addComment from "../../../entities/comment/model/addComment"
import useCommentStore from "../../../entities/comment/model/useCommentStore"
import { Button } from "../../../shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { Textarea } from "../../../shared/ui/textarea"

//댓글 추가 모달
const CommentAddModal = () => {
  const { showAddCommentDialog, setShowAddCommentDialog, newComment, setNewComment } = useCommentStore.getState()
  console.log(showAddCommentDialog)
  useEffect(() => {}, [showAddCommentDialog])
  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body as string}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setNewComment({ ...newComment, body: e.target.value })
            }
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentAddModal
