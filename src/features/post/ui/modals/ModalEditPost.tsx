import { Post } from "@/entities/post/model/types";

import FormEditPost from "@/features/post/ui/forms/FormEditPost";

import { useGlobalModal } from "@/shared/model/useGlobalModal";
import { Button, Dialog } from "@/shared/ui";

import { Edit2 } from "lucide-react";
import usePostsStore from "../../model/usePostsStore";

const ModalEditPost = ({ post }: { post: Post }) => {
  const { isOpen, toggle } = useGlobalModal("editPost", post.id);

  const handleSelectPost = usePostsStore((state) => state.handleSelectPost);

  const openEditModal = () => {
    handleSelectPost(post);
  };

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
