import { Post } from "@/entities/post/model/types";
import Comments from "@/features/post-comment/ui/Comments";

import { highlightText } from "@/shared/lib/utils";

type PostDetailProps = {
  searchQuery: string;
  post: Post | null;
};

const PostDetail = ({ searchQuery, post }: PostDetailProps) => {
  return (
    <div className="space-y-4">
      <p>{highlightText(post?.body, searchQuery)}</p>
      <Comments postId={post?.id || 0} />
    </div>
  );
};

export default PostDetail;
