import { Comment } from "@/entities/comment/model/types";

import { Button } from "@/shared/ui";

import { Trash2 } from "lucide-react";
import useCommentStore from "../model/useCommentStore";

type CommentLikeButtonProps = {
  comment: Comment;
  postId: number;
};

const CommentDeleteButton = ({ comment, postId }: CommentLikeButtonProps) => {
  const deleteComment = useCommentStore((state) => state.deleteComment);

  return (
    <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
      <Trash2 className="w-3 h-3" />
    </Button>
  );
};

export default CommentDeleteButton;
