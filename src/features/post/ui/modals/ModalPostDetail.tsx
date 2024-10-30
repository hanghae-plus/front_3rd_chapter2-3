import { Post } from "@/entities/post/model/types";

import PostDetail from "@/features/post/ui/PostDetail";

import { Button, Dialog } from "@/shared/ui";

import HighlightText from "@/shared/ui/HighlightText";
import { MessageSquare } from "lucide-react";
import { useModalPostDetail } from "../../model/useModalPostDetail";

type ModalPostDetailProps = {
  post: Post;
};

const ModalPostDetail = ({ post }: ModalPostDetailProps) => {
  const { isOpen, toggle, selectedPost, searchQuery, openPostDetail } = useModalPostDetail({ postId: post.id });

  return (
    <Dialog.Container open={isOpen} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
          <MessageSquare className="w-4 h-4" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>
            <HighlightText text={selectedPost?.title} highlight={searchQuery} />
          </Dialog.Title>
        </Dialog.Header>
        <PostDetail searchQuery={searchQuery} post={selectedPost} />
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalPostDetail;
