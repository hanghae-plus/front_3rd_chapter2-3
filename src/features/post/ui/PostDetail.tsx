import { useSelectedPost } from "@/entities/post/model/SelectedPostContext";
import Comments from "@/features/post-comment/ui/Comments";

import { highlightText } from "@/shared/lib/utils";

type PostDetailProps = {
  searchQuery: string;
};

const PostDetail = ({ searchQuery }: PostDetailProps) => {
  const { selectedPost } = useSelectedPost();

  return (
    <div className="space-y-4">
      <p>{highlightText(selectedPost?.body, searchQuery)}</p>
      <Comments postId={selectedPost?.id || 0} />
    </div>
  );
};

export default PostDetail;
