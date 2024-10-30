import { PostTable } from "../../../feature/post/ui";
import { usePostContext } from "../../../feature/post/model/PostContext.tsx";

export const PostTableWidget = () => {
  const { loading } = usePostContext();

  return <>{loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}</>;
};
