import { Comment } from "@/entities/comment/model/types";

import { Button } from "@/shared/ui";

import { Trash2 } from "lucide-react";
import { useDeleteComment } from "../api/use-delete-comment";

type CommentLikeButtonProps = {
  comment: Comment;
};

const CommentDeleteButton = ({ comment }: CommentLikeButtonProps) => {
  const { mutate: deleteComment } = useDeleteComment();

  return (
    <Button variant="ghost" size="sm" onClick={() => deleteComment({ postId: comment.postId, id: comment.id })}>
      <Trash2 className="w-3 h-3" />
    </Button>
  );
};

export default CommentDeleteButton;
