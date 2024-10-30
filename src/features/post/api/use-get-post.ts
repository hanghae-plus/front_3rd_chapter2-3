import { postQueries } from "@/entities/post/api/post-queries";
import { useQuery } from "@tanstack/react-query";

export const useQueryPosts = ({ limit, skip }: { limit: number; skip: number }) => {
  return useQuery(postQueries.list({ limit, skip }));
};
