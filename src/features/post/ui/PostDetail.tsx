import { Post } from "@/entities/post/model/types";

import Comments from "@/features/comment/ui/Comments";

import { useQueryParams } from "@/shared/model/useQueryParams";
import HighlightText from "@/shared/ui/HighlightText";

type PostDetailProps = {
  post: Post | null;
};

const PostDetail = ({ post }: PostDetailProps) => {
  const { queries } = useQueryParams();

  return (
    <div className="space-y-4">
      <p>
        <HighlightText text={post?.body} highlight={queries.search} />
      </p>
      <Comments postId={post?.id || 0} />
    </div>
  );
};

export default PostDetail;
