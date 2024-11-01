import { useFetchCommentQuery } from "../../features/comment/model/hook/useQuery";
import { Comment } from "../../features/comment/ui/Comment";

type Props = {
  postId: number;
};

export function Comments({ postId }: Props) {
  const { data: commentData } = useFetchCommentQuery(postId);
  const { comments } = commentData || {};

  return (
    <div className="mt-2">
      <div className="space-y-1">{comments?.map((comment) => <Comment comment={comment} />)}</div>
    </div>
  );
}
