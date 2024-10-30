import { useEffect } from "react";

import { useQueryGetPost } from "@/entities/post/api";
import { postListState } from "@/entities/post/model/post-state";
import { userListState } from "@/entities/user/model/user-state";

export function useSearchPostList() {
  const { setNewPostList } = postListState();
  const { userList } = userListState();
  const { data: postList } = useQueryGetPost();

  const searchPostList = () => {
    setNewPostList(postList ?? []);
    // setTotal(postsData.total);
  };

  useEffect(() => {
    searchPostList();
  }, [userList]);

  return { searchPostList };
}
