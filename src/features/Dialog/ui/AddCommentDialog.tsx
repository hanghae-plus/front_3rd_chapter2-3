import { Button, DialogHeader, Dialog, DialogContent, Textarea, DialogTitle } from "../../../shared/ui";
import { useCommentStore } from "../../Comment/model/stores/useCommentStore";
import { useCommentService } from "../../Comment/model/services/useCommentService";

export const AddCommentDialog = () => {
  const { showAddCommentDialog, setShowAddCommentDialog } = useCommentStore()
  const { newComment, setNewComment } = useCommentStore()
  const { addComment } = useCommentService()

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
