import { postQueries } from "@/entities/post/api/post-queries";
import { UseQueryPosts } from "../model/types";

export const getQueryConfig = ({ search, tag, priorityKey, limit, skip }: UseQueryPosts) => {
  if (!!tag && tag !== "all" && priorityKey === "tag") {
    return postQueries.tag({ tag });
  }
  if (!!search && priorityKey === "search") {
    return postQueries.search({ searchQuery: search });
  }

  return postQueries.list({ limit, skip });
};

export const postQueryKey = (queries: UseQueryPosts) => {
  const { search, tag, priorityKey, limit, skip } = queries;
  const isSearch = !!search && priorityKey === "search";
  const isTag = !!tag && tag !== "all" && priorityKey === "tag";

  if (isTag) {
    return postQueries.tag({ tag: tag ?? "" }).queryKey;
  }
  if (isSearch) {
    return postQueries.search({ searchQuery: search ?? "" }).queryKey;
  }

  return postQueries.list({ limit, skip }).queryKey;
};
