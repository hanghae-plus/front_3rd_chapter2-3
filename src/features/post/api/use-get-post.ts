import { postQueries } from "@/entities/post/api/post-queries";
import { mergePostsWithUsers } from "@/entities/post/lib/post-query-helper";
import { userQueries } from "@/entities/user/api/user-queries";
import { useQueries, useQuery } from "@tanstack/react-query";
import { UseQueryPosts } from "../model/types";

export const useQueryPosts = ({ limit, skip, search, tag, priorityKey }: UseQueryPosts) => {
  const isSearch = !!search && priorityKey === "search";
  const isTag = !!tag && tag !== "all" && priorityKey === "tag";

  const results = useQueries({
    queries: [
      {
        ...postQueries.search({ searchQuery: search ?? "" }),
        enabled: isSearch,
      },
      {
        ...postQueries.tag({ tag: tag ?? "" }),
        enabled: isTag,
      },
      {
        ...postQueries.list({ limit, skip }),
        enabled: !isSearch && !isTag,
      },
    ],
  });
  const users = useQuery({
    ...userQueries.list({ select: ["username", "image"] }),
  });

  // 활성화된 쿼리 찾기
  const activeQuery = results.find((result) => result.isSuccess && result.data) ?? results[0];

  if (!activeQuery.data || !users.data) {
    return { ...activeQuery, data: undefined, isLoading: results.some((result) => result.isLoading) };
  }

  return {
    ...activeQuery,
    data: mergePostsWithUsers(activeQuery.data, users.data),
    isLoading: results.some((result) => result.isLoading),
  };
};
