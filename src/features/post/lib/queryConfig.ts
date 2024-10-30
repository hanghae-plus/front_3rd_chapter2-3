import { postQueries } from "@/entities/post/api/post-queries";
import { UseQueryPosts } from "../model/types";

export const getQueryConfig = ({ search, tag, priorityKey }: Pick<UseQueryPosts, "search" | "tag" | "priorityKey">) => {
  if (!!search && priorityKey === "search") {
    return postQueries.search({ searchQuery: search });
  }

  if (!!tag && tag !== "all" && priorityKey === "tag") {
    return postQueries.tag({ tag });
  }
};

export const postQueryKey = (queries: UseQueryPosts) => {
  const { search, tag, priorityKey, limit, skip } = queries;
  const isSearch = !!search && priorityKey === "search";
  const isTag = !!tag && tag !== "all" && priorityKey === "tag";

  const getQueryKey = () => {
    if (isSearch) {
      return postQueries.search({ searchQuery: search ?? "" }).queryKey;
    }

    if (isTag) {
      return postQueries.tag({ tag: tag ?? "" }).queryKey;
    }

    return postQueries.list({ limit, skip }).queryKey;
  };

  return getQueryKey();
};
