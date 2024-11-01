import { useFetchCommentQuery } from "../../features/comment/model/hook/useQuery";
import { Comment } from "../../features/comment/ui/Comment";
import { CommentHeader } from "../../features/comment/ui";

type Props = {
  postId: number;
};

export function Comments({ postId }: Props) {
  const { data: commentData } = useFetchCommentQuery(postId);
  const { comments } = commentData || {};

  return (
    <div className="mt-2">
      <CommentHeader />
      <div className="space-y-1">{comments?.map((comment) => <Comment key={comment.id} comment={comment} />)}</div>
    </div>
  );
}
