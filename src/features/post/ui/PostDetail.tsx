import { useSelectedPost } from "@/features/post/model/SelectedPostContext";

import { highlightText } from "@/shared/lib/utils";

type PostDetailProps = {
  searchQuery: string;
  renderComments: (postId: number) => React.ReactNode;
};

const PostDetail = ({ searchQuery, renderComments }: PostDetailProps) => {
  const { selectedPost } = useSelectedPost();

  return (
    <div className="space-y-4">
      <p>{highlightText(selectedPost?.body, searchQuery)}</p>
      {renderComments(selectedPost?.id || 0)}
    </div>
  );
};

export default PostDetail;
