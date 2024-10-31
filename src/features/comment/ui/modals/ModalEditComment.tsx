import { Comment } from "@/entities/comment/model/types";

import FormEditComment from "@/features/comment/ui/forms/FormEditComment";
import { useGlobalModal } from "@/shared/model";

import { Button, Dialog } from "@/shared/ui";

import { Edit2 } from "lucide-react";

type ModalEditCommentProps = {
  comment: Comment | null;
};

const ModalEditComment = ({ comment }: ModalEditCommentProps) => {
  const { toggle, isOpen } = useGlobalModal("editComment", comment?.id);
  return (
    <Dialog.Container open={isOpen} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="sm" data-testid="edit-comment-button">
          <Edit2 className="w-3 h-3" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>댓글 수정</Dialog.Title>
        </Dialog.Header>
        <FormEditComment comment={comment} />
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalEditComment;
