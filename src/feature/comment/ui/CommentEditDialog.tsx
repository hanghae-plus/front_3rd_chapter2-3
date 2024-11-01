import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui";
import { useComment, useUpdateComment } from "../model";

export const CommentEditDialog = () => {
  const { selectedComment, setSelectedComment, showEditCommentDialog, setShowEditCommentDialog, setComments } =
    useComment();

  const { mutate: updateComment } = useUpdateComment({
    onSuccess: (data) => {
      if (data) {
        setComments((prev) => ({
          ...prev,
          [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
        }));

        setShowEditCommentDialog(false);
      }
    },
  });

  const handleUpdateComment = () => {
    if (selectedComment?.id && selectedComment?.body) {
      updateComment({ id: selectedComment.id, body: selectedComment.body });
    }
  };

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        {selectedComment && (
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
            />
            <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
