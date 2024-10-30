import { Post } from "@/entities/post/model/types";
import Comments from "@/features/comment/ui/Comments";
import HighlightText from "@/shared/ui/HighlightText";

type PostDetailProps = {
  searchQuery: string;
  post: Post | null;
};

const PostDetail = ({ searchQuery, post }: PostDetailProps) => {
  return (
    <div className="space-y-4">
      <p>
        <HighlightText text={post?.body} highlight={searchQuery} />
      </p>
      <Comments postId={post?.id || 0} />
    </div>
  );
};

export default PostDetail;
