import { NewComment } from "@/pages/PostsManagerPage";
import { Button, Dialog, Textarea } from "@/shared/ui";
import { DialogTitle } from "@radix-ui/react-dialog";

type ModalAddCommentProps = {
  showAddCommentDialog: boolean;
  setShowAddCommentDialog: (open: boolean) => void;
  newComment: NewComment;
  addComment: () => void;
  onChangeComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const ModalAddComment = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  newComment,
  addComment,
  onChangeComment,
}: ModalAddCommentProps) => {
  return (
    <Dialog.Container open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </Dialog.Header>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={newComment.body} onChange={onChangeComment} />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </Dialog.Content>
    </Dialog.Container>
  );
};
