import { Comment } from "@/entities/comment/model/types";

import { Button } from "@/shared/ui";

import { Trash2 } from "lucide-react";
import { useMutateDeleteComment } from "../api/use-delete-comment";

type CommentLikeButtonProps = {
  comment: Comment;
};

const CommentDeleteButton = ({ comment }: CommentLikeButtonProps) => {
  const { mutate: deleteComment } = useMutateDeleteComment();

  return (
    <Button variant="ghost" size="sm" onClick={() => deleteComment({ postId: comment.postId, id: comment.id })}>
      <Trash2 className="w-3 h-3" />
    </Button>
  );
};

export default CommentDeleteButton;
