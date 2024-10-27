import FormEditPost from "@/features/post/ui/FormEditPost";
import { Post } from "@/pages/PostsManagerPage";
import useToggle from "@/shared/lib/useToggle";
import { Button, Dialog } from "@/shared/ui";
import { Edit2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type ModalEditPostProps = {
  setPosts: Dispatch<SetStateAction<Post[]>>;
};

const ModalEditPost = ({ setPosts }: ModalEditPostProps) => {
  const { isOpen, toggle, close } = useToggle();

  return (
    <Dialog.Container open={isOpen} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="sm">
          <Edit2 className="w-4 h-4" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>게시물 수정</Dialog.Title>
        </Dialog.Header>
        <FormEditPost setPosts={setPosts} close={close} />
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalEditPost;
