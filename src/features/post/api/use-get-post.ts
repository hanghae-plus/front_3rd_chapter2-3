import { postQueries } from "@/entities/post/api/post-queries";
import { useQuery } from "@tanstack/react-query";

export const useQueryPosts = ({
  limit,
  skip,
  search,
  tag,
  priorityKey,
}: {
  limit: number;
  skip: number;
  search?: string;
  tag?: string;
  priorityKey: string | null;
}) => {
  if (search && priorityKey === "search") {
    return useQuery(postQueries.search({ searchQuery: search }));
  }
  if (tag && tag !== "all" && priorityKey === "tag") {
    return useQuery(postQueries.tag({ tag }));
  }
  return useQuery(postQueries.list({ limit, skip }));
};
