import { Post } from "@/entities/post/model/types";
import FormEditPost from "@/features/post/ui/forms/FormEditPost";

import useToggle from "@/shared/model/useToggle";

import { Button, Dialog } from "@/shared/ui";

import { Edit2 } from "lucide-react";
import usePostsStore from "../../model/usePostsStore";

type ModalEditPostProps = {
  post: Post;
};

const ModalEditPost = ({ post }: ModalEditPostProps) => {
  const { isOpen, toggle, close } = useToggle();
  const handleSelectPost = usePostsStore((state) => state.handleSelectPost);

  return (
    <Dialog.Container open={isOpen} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="sm" onClick={() => handleSelectPost(post)}>
          <Edit2 className="w-4 h-4" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>게시물 수정</Dialog.Title>
        </Dialog.Header>
        <FormEditPost close={close} />
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalEditPost;
