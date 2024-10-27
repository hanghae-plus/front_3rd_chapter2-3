import { Post } from "@/entities/post/model/types";
import { useSelectedPost } from "@/features/post/model/SelectedPostContext";
import PostDetail from "@/features/post/ui/PostDetail";
import useToggle from "@/shared/lib/useToggle";
import { highlightText } from "@/shared/lib/utils";
import { Button, Dialog } from "@/shared/ui";
import { MessageSquare } from "lucide-react";
import React from "react";

type ModalPostDetailProps = {
  fetchComments: (postId: number) => Promise<void>;
  searchQuery: string;
  renderComments: (postId: number) => React.ReactNode;
  post: Post;
};

const ModalPostDetail = ({ fetchComments, searchQuery, renderComments, post }: ModalPostDetailProps) => {
  const { isOpen, toggle } = useToggle();
  const { selectedPost, handleSelectPost } = useSelectedPost();

  const openPostDetail = (post: Post) => {
    handleSelectPost(post);
    fetchComments(post.id);
  };

  return (
    <Dialog.Container open={isOpen} onOpenChange={toggle}>
      <Dialog.Trigger asChild onClick={() => openPostDetail(post)}>
        <Button variant="ghost" size="sm">
          <MessageSquare className="w-4 h-4" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>{highlightText(selectedPost?.title, searchQuery)}</Dialog.Title>
        </Dialog.Header>
        <PostDetail searchQuery={searchQuery} renderComments={renderComments} />
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalPostDetail;
