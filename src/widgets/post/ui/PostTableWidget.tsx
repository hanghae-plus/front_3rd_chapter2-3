import { PostTable } from "../../../feature/post/ui";
import { getTags } from "../../../entities/post/api";
import { useEffect } from "react";
import { usePost } from "../../../feature/post/model";

export const PostTableWidget = () => {
  const { loading, setTags } = usePost();

  const fetchTags = async () => {
    const data = await getTags();
    if (data) setTags(data);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return <>{loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}</>;
};
