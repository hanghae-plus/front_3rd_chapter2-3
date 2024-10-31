import { Post } from "@/entities/post/model/types";

import PostDetail from "@/features/post/ui/PostDetail";

import { useGlobalModal, useQueryParams } from "@/shared/model";
import { Button, Dialog } from "@/shared/ui";
import HighlightText from "@/shared/ui/HighlightText";

import { MessageSquare } from "lucide-react";
import { useShallow } from "zustand/shallow";

import usePostsStore from "../../model/usePostsStore";

type ModalPostDetailProps = {
  post: Post;
};

const ModalPostDetail = ({ post }: ModalPostDetailProps) => {
  const { isOpen, toggle } = useGlobalModal("postDetail", post.id);
  const { queries } = useQueryParams();

  const { selectedPost, handleSelectPost } = usePostsStore(
    useShallow((state) => ({
      selectedPost: state.selectedPost,
      handleSelectPost: state.handleSelectPost,
    })),
  );

  const openPostDetail = (post: Post) => {
    handleSelectPost(post);
  };

  return (
    <Dialog.Container open={isOpen} onOpenChange={toggle}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)} data-testid="open-post-detail">
          <MessageSquare className="w-4 h-4" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-w-3xl">
        <Dialog.Header>
          <Dialog.Title>
            <HighlightText text={selectedPost?.title} highlight={queries.search} />
          </Dialog.Title>
        </Dialog.Header>
        <PostDetail post={selectedPost} />
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalPostDetail;
