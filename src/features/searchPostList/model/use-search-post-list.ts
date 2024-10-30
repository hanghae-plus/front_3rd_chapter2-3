import { useEffect } from "react";

import { useQueryGetPost } from "@/entities/post/api";
import { postListState } from "@/entities/post/model/post-state";
import { userListState } from "@/entities/user/model/user-state";

export function useSearchPostList() {
  const { setNewPostList } = postListState();
  const { userList } = userListState();
  const { refetch } = useQueryGetPost();

  const searchPostList = async () => {
    const postList = await refetch();
    setNewPostList(postList.data ?? []);
    // setTotal(postsData.total);
  };

  useEffect(() => {
    searchPostList();
  }, [userList]);

  return { searchPostList };
}
