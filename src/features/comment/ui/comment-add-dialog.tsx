import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
} from "../../../shared/ui";
import { useCommentMutations } from "../api/use-comment-mutations";
import { useComment } from "../model/use-comment";

export const CommentAddDialog = () => {
  const { showAddCommentDialog, setShowAddCommentDialog, newComment, setNewComment } = useComment();

  const { postCommentMutation } = useCommentMutations();

  const handleAddComment = () => {
    postCommentMutation.mutate(newComment);
    setShowAddCommentDialog(false);
  };

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
            onChange={e => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
