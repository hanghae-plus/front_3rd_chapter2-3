import { PostTable } from "../../../feature/post/ui";
import { usePostContext } from "../../../feature/post/model/PostContext.tsx";
import { useCommentContext } from "../../../feature/comment/model/CommentContext.tsx";
import { Post } from "../../../entities/post/model/types.ts";

export const PostTableWidget = () => {
  const { loading, setSelectedPost, setShowPostDetailDialog } = usePostContext();

  return <>{loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}</>;
};
