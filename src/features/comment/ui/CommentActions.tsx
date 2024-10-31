import { Comment } from "@/entities/comment/model/types";

import CommentDeleteButton from "@/features/comment/ui/CommentDeleteButton";
import CommentLikeButton from "@/features/comment/ui/CommentLikeButton";
import ModalEditComment from "@/features/comment/ui/modals/ModalEditComment";

type CommentActionsProps = {
  comment: Comment;
};

const CommentActions = ({ comment }: CommentActionsProps) => {
  return (
    <div className="flex items-center space-x-1">
      <CommentLikeButton comment={comment} />
      <ModalEditComment comment={comment} />
      <CommentDeleteButton comment={comment} />
    </div>
  );
};

export default CommentActions;
