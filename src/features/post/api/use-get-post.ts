import { mergePostsWithUsers } from "@/entities/post/lib/post-query-helper";
import { userQueries } from "@/entities/user/api/user-queries";
import { useQuery } from "@tanstack/react-query";
import { getQueryConfig } from "../lib/queryConfig";
import { UseQueryPosts } from "../model/types";

export const useQueryPosts = (queries: UseQueryPosts) => {
  const queryConfig = getQueryConfig(queries);

  const postsQuery = useQuery({
    ...queryConfig,
    staleTime: 0,
  });

  const usersQuery = useQuery({
    ...userQueries.list({ select: ["username", "image"] }),
    staleTime: 0,
  });

  if (!postsQuery.data || !usersQuery.data) {
    return {
      ...postsQuery,
      data: undefined,
      isLoading: postsQuery.isLoading || usersQuery.isLoading,
    };
  }

  return {
    ...postsQuery,
    data: mergePostsWithUsers(postsQuery.data, usersQuery.data),
  };
};
