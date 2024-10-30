import { postQueries } from "@/entities/post/api/post-queries";
import { useQuery } from "@tanstack/react-query";

export const useQueryPosts = ({
  limit,
  skip,
  search,
  tag,
}: {
  limit: number;
  skip: number;
  search?: string;
  tag?: string;
}) => {
  if (search) {
    return useQuery(postQueries.search({ searchQuery: search }));
  }
  if (tag && tag !== "all") {
    return useQuery(postQueries.tag({ tag }));
  }
  return useQuery(postQueries.list({ limit, skip }));
};
