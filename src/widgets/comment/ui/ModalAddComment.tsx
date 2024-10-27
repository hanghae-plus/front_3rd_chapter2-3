import FormAddComment from "@/features/comment/ui/FormAddComment";
import useToggle from "@/shared/lib/useToggle";
import { Button, Dialog } from "@/shared/ui";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type ModalAddCommentProps = {
  setComments: Dispatch<SetStateAction<{ [key: number]: Comment[] }>>;

  postId: number;
};

export const ModalAddComment = ({ setComments, postId }: ModalAddCommentProps) => {
  const { toggle, isOpen, close } = useToggle();
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
        <FormAddComment setComments={setComments} close={close} postId={postId} />
      </Dialog.Content>
    </Dialog.Container>
  );
};
