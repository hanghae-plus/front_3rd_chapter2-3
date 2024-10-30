import { NewComment } from "../../../entities/comments/model/Comments"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"

interface CommentsAddDialogProps {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: (open: boolean) => void
  newComment: NewComment
  setNewComment: React.Dispatch<React.SetStateAction<NewComment>>
  addComment: () => void
}

//댓글 추가 대화상자
const CommentsAddDialog = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  newComment,
  setNewComment,
  addComment,
}: CommentsAddDialogProps) => {
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

export default CommentsAddDialog
