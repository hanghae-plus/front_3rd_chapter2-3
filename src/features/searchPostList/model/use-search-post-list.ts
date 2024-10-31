import { useEffect } from "react";

import { useQueryGetPost } from "@/entities/post/api";
import { postListState } from "@/entities/post/model/post-state";
import { useLocation } from "react-router-dom";

export function useSearchPostList() {
  const location = useLocation();
  const { setNewPostList } = postListState();
  const { isLoading, refetch } = useQueryGetPost();

  const searchPostList = async () => {
    const postList = await refetch();
    setNewPostList(postList.data ?? []);
    // setTotal(postsData.total);
  };

  useEffect(() => {
    searchPostList();
  }, [location.search]);

  return { isLoading, searchPostList };
}
