import { postQueries } from "@/entities/post/api/post-queries";
import { useQuery } from "@tanstack/react-query";

export const useSearchPosts = (searchQuery: string) => {
  return useQuery({
    ...postQueries.search({ searchQuery }),
    enabled: !!searchQuery,
  });
};
