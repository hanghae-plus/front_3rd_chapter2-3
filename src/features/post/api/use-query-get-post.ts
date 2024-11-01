import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { userListState } from "@/entities/user/model/user-state";
import { PostListTotal } from "@/entities/post/model/post-type";
import { fetchPostList } from "@/entities/post/api/fetch-get-post";

export const useQueryGetPost = () => {
  const { userList } = userListState();
  const [searchParams] = useSearchParams();
  return useQuery<PostListTotal>({
    queryKey: ["search-post", { ...searchParams }],
    queryFn: () => fetchPostList(userList, searchParams),
    enabled: userList.length > 0,
  });
};
