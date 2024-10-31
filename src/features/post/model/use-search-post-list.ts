import { useQueryGetPost } from "@/entities/post/api";
import { postListState } from "@/entities/post/model/post-state";

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
