import { useAtom } from "jotai"
import { Button } from "../../../shared/ui/button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog/Dialog"
import { Textarea } from "../../../shared/ui/input/Text"
import { useCommentHandler } from "../hooks/useCommentHandler"
import { newCommentAtom, showAddCommentDialogAtom } from "../model/commentAtom"

export const CommentCreateDialog = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)

  const { commentCreate } = useCommentHandler()

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
          <Button onClick={commentCreate}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
