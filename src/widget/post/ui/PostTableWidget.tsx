import { PostTable } from "../../../feature/post/ui";
import { usePostContext } from "../../../feature/post/model/PostContext.tsx";
import { Post } from "../../../temp/types.ts";
import { useCommentContext } from "../../../feature/comment/model/CommentContext.tsx";

export const PostTableWidget = ({ setShowPostDetailDialog }) => {
  const { loading, setSelectedPost } = usePostContext();
  const { fetchComments } = useCommentContext();

  const openPostDetail = async (post: Post) => {
    setSelectedPost({ ...post });
    await fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center p-4">로딩 중...</div>
      ) : (
        <PostTable openPostDetail={openPostDetail} />
      )}
    </>
  );
};
