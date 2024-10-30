import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { PostsResponse } from "../model/types";
import { postApi } from "./postApi";

export const postQueries = {
  all: () => ["posts"],
  list: ({ limit, skip }: { limit: number; skip: number }) =>
    queryOptions({
      queryKey: [...postQueries.all(), "list", limit, skip],
      queryFn: () => postApi.getPosts({ limit, skip }),
      placeholderData: keepPreviousData,
      select: (data) => {
        const updatedPosts = data.posts.map((post) => ({
          ...post,
          ...(post.author ? { author: post.author } : { author: { id: 1, name: "John Doe" } }),
          ...(post.tags ? { tags: post.tags } : { tags: [] }),
          ...(post.reactions ? { reactions: post.reactions } : { reactions: { likes: 0, dislikes: 0 } }),
        }));
        return { ...data, posts: updatedPosts } as PostsResponse;
      },
    }),
  search: ({ searchQuery }: { searchQuery: string }) =>
    queryOptions({
      queryKey: [...postQueries.all(), "search", searchQuery],
      queryFn: () => postApi.searchPosts(searchQuery),
      placeholderData: keepPreviousData,
    }),
  tag: ({ tag }: { tag: string }) =>
    queryOptions({
      queryKey: [...postQueries.all(), "tag", tag],
      queryFn: () => postApi.fetchPostsByTag(tag),
      placeholderData: keepPreviousData,
    }),
};
