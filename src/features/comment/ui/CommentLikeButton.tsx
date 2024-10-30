import { Comment } from "@/entities/comment/model/types";

import { Button } from "@/shared/ui";

import { ThumbsUp } from "lucide-react";
import { useLikeComment } from "../api/use-like-comment";

type CommentLikeButtonProps = {
  comment: Comment;

};

const CommentLikeButton = ({ comment }: CommentLikeButtonProps) => {
  const { mutate: likeComment } = useLikeComment();

  const handleLikeComment = () => {
    likeComment(comment);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleLikeComment}>
      <ThumbsUp className="w-3 h-3" />
      <span className="ml-1 text-xs">{comment.likes}</span>
    </Button>
  );
};

export default CommentLikeButton;
