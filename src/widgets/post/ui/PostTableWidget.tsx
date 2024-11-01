import { PostTable } from "../../../feature/post/ui";
import { usePost } from "../../../feature/post/model";

export const PostTableWidget = () => {
  const { loading } = usePost();

  return <>{loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}</>;
};
