import { Post } from "@/entities/post/model/types";

import PostDetail from "@/features/post/ui/PostDetail";

import { useNavigator } from "@/shared/lib/useNavigator";
import useToggle from "@/shared/lib/useToggle";
import { highlightText } from "@/shared/lib/utils";
import { Button, Dialog } from "@/shared/ui";

import useCommentStore from "@/features/post-comment/model/useCommentStore";
import { MessageSquare } from "lucide-react";
import { useShallow } from "zustand/shallow";
import usePostsStore from "../../model/usePostsStore";

type ModalPostDetailProps = {
  post: Post;
};

const ModalPostDetail = ({ post }: ModalPostDetailProps) => {
  const { queries } = useNavigator();
  const { search: searchQuery } = queries;
  const { isOpen, toggle } = useToggle();
  const fetchComments = useCommentStore((state) => state.fetchComments);
  const { selectedPost, handleSelectPost } = usePostsStore(
    useShallow((state) => ({
      selectedPost: state.selectedPost,
      handleSelectPost: state.handleSelectPost,
    })),
  );

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
        <PostDetail searchQuery={searchQuery} post={selectedPost} />
      </Dialog.Content>
    </Dialog.Container>
  );
};

export default ModalPostDetail;
