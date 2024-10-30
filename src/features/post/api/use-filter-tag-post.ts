import { postQueries } from "@/entities/post/api/post-queries";
import { useQuery } from "@tanstack/react-query";

export const useFilterTagPosts = (tag: string) => {
  return useQuery({
    ...postQueries.tag({ tag }),
    enabled: !!tag && tag !== "all",
  });
};
