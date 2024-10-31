import { CommentType } from "@/entities/comment/model/comment-type";
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui";
import { useUpdateComment } from "../model/use-update-comment";

interface UpdateCommentDialogProps {
  isOpen: boolean;
  close: () => void;
  comment: CommentType;
  updateComment: (newComment: CommentType) => void;
}

export const UpdateCommentDialog = ({
  isOpen,
  close,
  comment,
  updateComment,
}: UpdateCommentDialogProps) => {
  const { newContent, handleChangeContent, handleUpdateComment } = useUpdateComment(comment);
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newContent}
            onChange={e => handleChangeContent(e.target.value)}
          />
          <Button onClick={() => handleUpdateComment(updateComment, close)}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
