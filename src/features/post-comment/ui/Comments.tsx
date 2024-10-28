import { useCommentContext } from "@/entities/comment/model/CommentContext";

import CommentActions from "@/features/post-comment/ui/CommentActions";
import CommentInfo from "@/features/post-comment/ui/CommentInfo";
import { ModalAddComment } from "@/features/post-comment/ui/modals/ModalAddComment";

import { useNavigator } from "@/shared/lib/useNavigator";

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
            <CommentInfo comment={comment} search={search} />
            <CommentActions comment={comment} postId={postId} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
