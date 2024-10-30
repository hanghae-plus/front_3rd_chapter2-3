import { Comment } from "@/entities/comment/model/types";

import FormEditComment from "@/features/comment/ui/forms/FormEditComment";

import useToggle from "@/shared/model/useToggle";

import { Button, Dialog } from "@/shared/ui";

import { Edit2 } from "lucide-react";

type ModalEditCommentProps = {
  comment: Comment | null;
};

const ModalEditComment = ({ comment }: ModalEditCommentProps) => {
  const { toggle, isOpen, close } = useToggle();
  return (
    <Dialog.Container open={isOpen} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="sm">
          <Edit2 className="w-3 h-3" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>댓글 수정</Dialog.Title>
        </Dialog.Header>
        <FormEditComment close={close} comment={comment} />
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalEditComment;
