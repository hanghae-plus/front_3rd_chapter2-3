import { Comment } from "@/pages/PostsManagerPage";
import { Button, Dialog, Textarea } from "@/shared/ui";

type ModalEditCommentProps = {
  showEditCommentDialog: boolean;
  setShowEditCommentDialog: (open: boolean) => void;
  selectedComment: Comment | null;
  updateComment: () => void;
  onChangeComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const ModalEditComment = ({
  showEditCommentDialog,
  setShowEditCommentDialog,
  selectedComment,
  updateComment,
  onChangeComment,
}: ModalEditCommentProps) => {
  return (
    <Dialog.Container open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>댓글 수정</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={selectedComment?.body || ""} onChange={onChangeComment} />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalEditComment;
