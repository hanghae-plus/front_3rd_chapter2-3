import { Comment } from "@/entities/comment/model/types";

import { Button } from "@/shared/ui";

import { ThumbsUp } from "lucide-react";
import useCommentStore from "../model/useCommentStore";

type CommentLikeButtonProps = {
  comment: Comment;
  postId: number;
};

const CommentLikeButton = ({ comment, postId }: CommentLikeButtonProps) => {
  const likeComment = useCommentStore((state) => state.likeComment);

  const handleLikeComment = () => {
    likeComment(comment, postId);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleLikeComment}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  );
};

export default CommentLikeButton;
