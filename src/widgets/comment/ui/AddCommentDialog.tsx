import { NewComment } from "../../../entities/comment/model/type"
import { Button } from "../../../shared/ui/Button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../shared/ui/Dialog"
import { Textarea } from "../../../shared/ui/Textarea"

interface Props {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => void
  newComment: NewComment
  setNewComment: (newComment: NewComment) => void
  addComment: () => Promise<void>
}

export const AddCommentDialog = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  newComment,
  setNewComment,
  addComment,
}: Props) => {
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
            onChange={(e) =>
              setNewComment({ ...newComment, body: e.target.value })
            }
          />
          <Button onClick={addComment}>댓글 추가(최종)</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
