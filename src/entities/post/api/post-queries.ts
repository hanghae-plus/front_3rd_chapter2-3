import { pipe } from "@/shared/lib/function";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { withDefaultAuthor, withDefaultReactions, withDefaultTags } from "../lib/post-query-helper";
import { PostsResponse } from "../model/types";
import { postApi } from "./post-api";

const pipePost = pipe(withDefaultAuthor, withDefaultTags, withDefaultReactions);

const createQueryKey = (base: string[], ...params: unknown[]) => [...base, ...params];

export const postQueries = {
  all: () => ["posts"],
  list: ({ limit, skip }: { limit: number; skip: number }) =>
    queryOptions({
      queryKey: createQueryKey(postQueries.all(), "list", limit, skip),
      queryFn: () => postApi.getPosts({ limit, skip }),
      placeholderData: keepPreviousData,
      select: (data: PostsResponse) => ({
        ...data,
        posts: data.posts.map(pipePost),
      }),
    }),

  search: ({ searchQuery }: { searchQuery: string }) =>
    queryOptions({
      queryKey: createQueryKey(postQueries.all(), "search", searchQuery),
      queryFn: () => postApi.searchPosts(searchQuery),
      placeholderData: keepPreviousData,
      select: (data: PostsResponse) => ({
        ...data,
        posts: data.posts.map(pipePost),
      }),
    }),

  tag: ({ tag }: { tag: string }) =>
    queryOptions({
      queryKey: createQueryKey(postQueries.all(), "tag", tag),
      queryFn: () => postApi.fetchPostsByTag(tag),
      placeholderData: keepPreviousData,
      select: (data: PostsResponse) => ({
        ...data,
        posts: data.posts.map(pipePost),
      }),
    }),
};
