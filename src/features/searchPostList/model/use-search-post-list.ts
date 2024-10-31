import { useQueryGetPost } from "@/entities/post/api";
import { postListState } from "@/entities/post/model/post-state";

export function useSearchPostList() {
  const { setNewPostList } = postListState();
  const { isLoading, refetch } = useQueryGetPost();

  const searchPostList = async () => {
    const postList = await refetch();
    setNewPostList(postList.data ?? []);
    // setTotal(postsData.total);
  };

  return { isLoading, searchPostList };
}
