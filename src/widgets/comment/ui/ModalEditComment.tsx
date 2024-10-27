import FormEditComment from "@/features/comment/ui/FormEditComment";
import { Comment } from "@/pages/PostsManagerPage";
import useToggle from "@/shared/lib/useToggle";
import { Button, Dialog } from "@/shared/ui";
import { Edit2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type ModalEditCommentProps = {
  setComments: Dispatch<SetStateAction<{ [key: number]: Comment[] }>>;
  comment: Comment | null;
};

const ModalEditComment = ({ setComments, comment }: ModalEditCommentProps) => {
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
        <FormEditComment setComments={setComments} close={close} comment={comment} />
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalEditComment;
