import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "@/shared/ui";
import { useAddComment } from "../model/use-add-comment";
import { PostWithAuthorType } from "@/entities/post/model/post-type";
import { CommentType } from "@/entities/comment/model/comment-type";

interface AddCommentDialogProps {
  isOpen: boolean;
  close: () => void;
  post: PostWithAuthorType;
  addNewComment: (newComment: CommentType) => void;
}

export const AddCommentDialog = ({ isOpen, close, post, addNewComment }: AddCommentDialogProps) => {
  const { newComment, handleChangeComment, addComment } = useAddComment(post.id);

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={e => handleChangeComment(e.target.value)}
          />
          <Button onClick={() => addComment(addNewComment, close)}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
