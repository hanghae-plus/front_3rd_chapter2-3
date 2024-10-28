import { Comment } from "@/entities/comment/model/types";

import { postCommentApi } from "@/features/post-comment/api/postCommentApi";

import { useCommentContext } from "@/entities/comment/model/CommentContext";

import { Button } from "@/shared/ui";

import { ThumbsUp } from "lucide-react";

type CommentLikeButtonProps = {
  comment: Comment;
  postId: number;
};

const CommentLikeButton = ({ comment, postId }: CommentLikeButtonProps) => {
  const { comments, handleSetComments } = useCommentContext();

  // 댓글 좋아요
  const likeComment = async (id: number, postId: number) => {
    const comment = comments[postId]?.find((c) => c.id === id);

    try {
      if (!comment) return;
      const data = await postCommentApi.likeComment(comment);
      console.log(data);
      handleSetComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) => (comment.id === data.id ? data : comment)),
      }));
    } catch (error) {
      console.error("댓글 좋아요 오류:", error);
    }
  };

  return (
    <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  );
};

export default CommentLikeButton;
