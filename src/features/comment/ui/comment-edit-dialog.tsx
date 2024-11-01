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

export const CommentEditDialog = () => {
  const { showEditCommentDialog, setShowEditCommentDialog, selectedComment, setSelectedComment } =
    useComment();

  const { updateCommentMutation } = useCommentMutations();

  const handleUpdateComment = () => {
    if (!selectedComment) return;
    updateCommentMutation.mutate(selectedComment);
    setShowEditCommentDialog(false);
  };

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={e => {
              if (selectedComment) {
                setSelectedComment({ ...selectedComment, body: e.target.value });
              }
            }}
          />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
