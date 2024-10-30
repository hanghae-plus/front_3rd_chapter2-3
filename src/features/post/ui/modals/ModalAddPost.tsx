import FormAddPost from "@/features/post/ui/forms/FormAddPost";

import { Button, Dialog } from "@/shared/ui";

import { NewPost } from "@/entities/post/model/types";
import { Plus } from "lucide-react";
import { useModalAddPost } from "../../model/useModalAddPost";

const ModalAddPost = () => {
  const { isOpen, toggle, addPost, close } = useModalAddPost();

  const handleAddPost = (newPost: NewPost) => {
    addPost(newPost);
    close();
  };

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
        <FormAddPost onSubmit={handleAddPost} />
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalAddPost;
