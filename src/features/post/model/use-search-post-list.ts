import { postListState } from "@/entities/post/model/post-state";
import { useQueryGetPost } from "../api/use-query-get-post";

export function useSearchPostList() {
  const { setNewPostList, setTotal } = postListState();
  const { isLoading, refetch } = useQueryGetPost();

  const searchPostList = async () => {
    const postList = await refetch();
    setNewPostList(postList.data?.postList ?? []);
    setTotal(postList.data?.total ?? 0);
  };

  return { isLoading, searchPostList };
}
