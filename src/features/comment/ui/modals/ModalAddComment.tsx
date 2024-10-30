import FormAddComment from "@/features/comment/ui/forms/FormAddComment";

import { Button, Dialog } from "@/shared/ui";

import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useModalAddComment } from "../../model/useModalAddComment";

type ModalAddCommentProps = {
  postId: number;
};

export const ModalAddComment = ({ postId }: ModalAddCommentProps) => {
  const { toggle, isOpen } = useModalAddComment();
  return (
    <Dialog.Container open={isOpen} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        <Button size="sm">
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </Dialog.Header>
        <FormAddComment postId={postId} />
      </Dialog.Content>
    </Dialog.Container>
  );
};
