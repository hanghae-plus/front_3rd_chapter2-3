import CommentActions from "@/features/comment/ui/CommentActions";
import CommentInfo from "@/features/comment/ui/CommentInfo";
import { ModalAddComment } from "@/features/comment/ui/modals/ModalAddComment";

import { useNavigator } from "@/shared/lib/useNavigator";
import { useQueryComments } from "../api/use-get-comment";

type CommentsProps = {
  postId: number;
};

const Comments = ({ postId }: CommentsProps) => {
  const { data: comments, isLoading: loading } = useQueryComments({ postId });
  const { queries } = useNavigator();
  const { search } = queries;

  if (loading) return <div className="flex justify-center p-4">로딩 중...</div>;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <ModalAddComment postId={postId} />
      </div>
      <div className="space-y-1">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <CommentInfo comment={comment} search={search} />
            <CommentActions comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
