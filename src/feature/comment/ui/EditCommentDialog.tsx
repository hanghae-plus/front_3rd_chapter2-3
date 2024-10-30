import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui";
import { putExistingComment } from "../../../entities/comment/api";
import { useComment } from "../model";

export const EditCommentDialog = () => {
  const { selectedComment, setSelectedComment, showEditCommentDialog, setShowEditCommentDialog, setComments } =
    useComment();

  const updateComment = async () => {
    if (selectedComment) {
      const data = await putExistingComment(selectedComment.id, selectedComment.body);

      if (data) {
        setComments((prev) => ({
          ...prev,
          [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
        }));
        setShowEditCommentDialog(false);
      }
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
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
