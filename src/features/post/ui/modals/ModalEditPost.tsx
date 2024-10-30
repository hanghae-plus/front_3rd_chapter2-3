import { Post } from "@/entities/post/model/types";
import FormEditPost from "@/features/post/ui/forms/FormEditPost";

import { Button, Dialog } from "@/shared/ui";

import { Edit2 } from "lucide-react";
import { useModalEditPost } from "../../model/useModalEditPost";

const ModalEditPost = ({ post }: { post: Post }) => {
  const { isOpen, toggle, openEditModal } = useModalEditPost(post);

  return (
    <Dialog.Container open={isOpen} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="sm" onClick={openEditModal}>
          <Edit2 className="w-4 h-4" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>게시물 수정</Dialog.Title>
        </Dialog.Header>
        <FormEditPost />
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalEditPost;
