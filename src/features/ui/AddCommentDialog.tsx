import { useAtom } from "jotai"
import { Button } from "../../shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/dialog"
import { Textarea } from "../../shared/ui/Textarea"
import { newCommentAtom, showAddCommentDialogAtom } from "../../app/atom"
import useManageComments from "../useManageComments"

const AddCommentDialog = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const { addComment } = useManageComments()

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
