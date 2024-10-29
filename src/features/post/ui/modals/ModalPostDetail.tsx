import { CommentResponse } from "@/entities/comment/model/types";
import { Post } from "@/entities/post/model/types";

import PostDetail from "@/features/post/ui/PostDetail";

import { useCommentContext } from "@/entities/comment/model/CommentContext";
import { useNavigator } from "@/shared/lib/useNavigator";
import useToggle from "@/shared/lib/useToggle";
import { highlightText } from "@/shared/lib/utils";
import { Button, Dialog } from "@/shared/ui";

import { MessageSquare } from "lucide-react";
import { useShallow } from "zustand/shallow";
import usePostsStore from "../../models/usePostsStore";

type ModalPostDetailProps = {
  post: Post;
};

const ModalPostDetail = ({ post }: ModalPostDetailProps) => {
  const { queries } = useNavigator();
  const { search: searchQuery } = queries;
  const { comments, handleSetComments } = useCommentContext();
  const { isOpen, toggle } = useToggle();
  const { selectedPost, handleSelectPost } = usePostsStore(
    useShallow((state) => ({
      selectedPost: state.selectedPost,
      handleSelectPost: state.handleSelectPost,
    })),
  );

  //! 댓글 가져오기
  const fetchComments = async (postId: number) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`);
      const data = (await response.json()) as CommentResponse;
      handleSetComments((prev) => ({ ...prev, [postId]: data.comments }));
    } catch (error) {
      console.error("댓글 가져오기 오류:", error);
    }
  };

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
