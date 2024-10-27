import { Post } from "@/entities/post/model/types";
import FormAddPost from "@/features/post/ui/FormAddPost";
import useToggle from "@/shared/lib/useToggle";
import { Button, Dialog } from "@/shared/ui";
import { Plus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type ModalAddPostProps = {
  setPosts: Dispatch<SetStateAction<Post[]>>;
};

const ModalAddPost = ({ setPosts }: ModalAddPostProps) => {
  const { isOpen, toggle, close } = useToggle();

  return (
    <Dialog.Container open={isOpen} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>새 게시물 추가</Dialog.Title>
        </Dialog.Header>
        <FormAddPost setPosts={setPosts} close={close} />
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalAddPost;
