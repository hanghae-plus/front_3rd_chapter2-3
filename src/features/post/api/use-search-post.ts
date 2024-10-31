import { postQueries } from "@/entities/post/api/post-queries";
import { useQuery } from "@tanstack/react-query";

export const useQuerySearchPosts = (searchQuery: string) => {
  return useQuery({
    ...postQueries.search({ searchQuery }),
    enabled: !!searchQuery,
  });
};
