import { createQueryKey } from "@/shared/lib/api";
import { merge } from "@/shared/lib/object";
import { queryOptions } from "@tanstack/react-query";
import { defaultPostPipeData, mergePostsWithUsers } from "../lib/post-query-helper";
import { PostsResponse } from "../model/types";
import { postApi } from "./post-api";

export const postQueries = {
  all: () => ["posts"],
  list: ({ limit, skip }: { limit: number; skip: number }) =>
    queryOptions({
      queryKey: createQueryKey(postQueries.all(), "list", limit, skip),
      queryFn: async () => {
        try {
          const data = await postApi.getPosts({ limit, skip });
          const enrichedData = await mergePostsWithUsers(data);
          return merge<PostsResponse>(enrichedData, "posts", enrichedData.posts.map(defaultPostPipeData));
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
          const enrichedData = await mergePostsWithUsers(data);
          return merge<PostsResponse>(enrichedData, "posts", enrichedData.posts.map(defaultPostPipeData));
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
          const data = await postApi.fetchPostsByTag(tag);
          const enrichedData = await mergePostsWithUsers(data);
          return merge<PostsResponse>(enrichedData, "posts", enrichedData.posts.map(defaultPostPipeData));
        } catch (error) {
          console.error("게시물 태그 가져오기 오류:", error);
          throw error;
        }
      },
    }),
};
