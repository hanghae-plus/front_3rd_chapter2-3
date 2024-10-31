import { PostSearchParamsKey } from "@/features/post/model/types";
import { createQueryKey } from "@/shared/lib/api";
import { queryOptions } from "@tanstack/react-query";
import { postApi } from "./post-api";

export const postQueries = {
  all: () => ["posts"],
  list: (queries: PostSearchParamsKey) =>
    queryOptions({
      queryKey: createQueryKey(postQueries.all(), "list", queries),
      queryFn: async () => {
        try {
          const data = await postApi.getPosts(queries);
          return data;
        } catch (error) {
          console.error("게시물 가져오기 오류:", error);
          throw error;
        }
      },
    }),

  search: ({ searchQuery }: { searchQuery: string }) =>
    queryOptions({
      queryKey: createQueryKey(postQueries.all(), "search", searchQuery),
      queryFn: async () => {
        try {
          const data = await postApi.searchPosts(searchQuery);
          return data;
        } catch (error) {
          console.error("게시물 검색 오류:", error);
          throw error;
        }
      },
    }),

  tag: ({ tag }: { tag: string }) =>
    queryOptions({
      queryKey: createQueryKey(postQueries.all(), "tag", tag),
      queryFn: async () => {
        try {
          const data = await postApi.getPostsByTag(tag);
          return data;
        } catch (error) {
          console.error("게시물 태그 가져오기 오류:", error);
          throw error;
        }
      },
    }),
};
