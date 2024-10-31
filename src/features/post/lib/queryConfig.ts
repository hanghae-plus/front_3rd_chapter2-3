import { postQueries } from "@/entities/post/api/post-queries";
import { UseQueryPosts } from "../model/types";

export const getQueryConfig = ({ search, tag, priorityKey, limit, skip }: UseQueryPosts) => {
  const isSearch = !!search && priorityKey === "search";
  const isTag = !!tag && tag !== "all" && priorityKey === "tag";

  if (isTag) {
    return postQueries.tag({ tag });
  }
  if (isSearch) {
    return postQueries.search({ searchQuery: search });
  }

  return postQueries.list({ limit, skip });
};
