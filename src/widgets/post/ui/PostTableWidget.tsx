import { PostTable } from "../../../feature/post/ui";
import { usePostContext } from "../../../feature/post/model/PostContext.tsx";
import { getTags } from "../../../entities/post/api";
import { useEffect } from "react";

export const PostTableWidget = () => {
  const { loading, setTags } = usePostContext();

  const fetchTags = async () => {
    const data = await getTags();
    if (data) setTags(data);
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return <>{loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable />}</>;
};
