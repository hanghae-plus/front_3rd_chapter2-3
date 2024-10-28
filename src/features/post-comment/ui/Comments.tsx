import { useCommentContext } from "@/entities/comment/model/CommentContext";

import CommentDeleteButton from "@/features/post-comment/ui/CommentDeleteButton";
import CommentLikeButton from "@/features/post-comment/ui/CommentLikeButton";
import { ModalAddComment } from "@/features/post-comment/ui/modals/ModalAddComment";
import ModalEditComment from "@/features/post-comment/ui/modals/ModalEditComment";

import { useNavigator } from "@/shared/lib/useNavigator";
import { highlightText } from "@/shared/lib/utils";

type CommentsProps = {
  postId: number;
};

const Comments = ({ postId }: CommentsProps) => {
  const { comments } = useCommentContext();
  const { queries } = useNavigator();
  const { search } = queries;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <ModalAddComment postId={postId} />
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, search)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <CommentLikeButton comment={comment} postId={postId} />
              <ModalEditComment comment={comment} />
              <CommentDeleteButton comment={comment} postId={postId} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
