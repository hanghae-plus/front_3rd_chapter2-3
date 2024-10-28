import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"

interface AddCommentDialogProps {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: (show: boolean) => void
  newComment: { body: string }
  setNewComment: (newComment: { body: string }) => void
}

export const AddCommentDialog: React.FC<AddCommentDialogProps> = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  newComment,
  setNewComment,
}) => {
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
          <Button
          // onClick={addComment}
          >
            댓글 추가
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
