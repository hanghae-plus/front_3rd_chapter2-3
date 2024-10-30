import { userApi } from "@/entities/user/api/user-api";
import { findById } from "@/shared/lib/array";
import { pipe } from "@/shared/lib/function";
import { merge } from "@/shared/lib/object";
import { queryOptions } from "@tanstack/react-query";
import { withDefaultAuthor, withDefaultReactions, withDefaultTags } from "../lib/post-query-helper";
import { PostsResponse } from "../model/types";
import { postApi } from "./post-api";

const pipePost = pipe(withDefaultAuthor, withDefaultTags, withDefaultReactions);

const createQueryKey = (base: string[], ...params: unknown[]) => [...base, ...params];

const mergePostsWithUsers = async (data: PostsResponse) => {
  const users = await userApi.getUsers({ select: ["username", "image"] });

  const withUsers = data.posts.map((post) => ({
    ...post,
    author: findById(users, post.userId),
  }));

  return merge<PostsResponse>(data, "posts", withUsers);
};

export const postQueries = {
  all: () => ["posts"],
  list: ({ limit, skip }: { limit: number; skip: number }) =>
    queryOptions({
      queryKey: createQueryKey(postQueries.all(), "list", limit, skip),
      queryFn: async () => {
        const data = await postApi.getPosts({ limit, skip });
        const enrichedData = await mergePostsWithUsers(data);
        return merge<PostsResponse>(enrichedData, "posts", enrichedData.posts.map(pipePost));
      },
    }),

  search: ({ searchQuery }: { searchQuery: string }) =>
    queryOptions({
      queryKey: createQueryKey(postQueries.all(), "search", searchQuery),
      queryFn: async () => {
        const data = await postApi.searchPosts(searchQuery);
        const enrichedData = await mergePostsWithUsers(data);
        return merge<PostsResponse>(enrichedData, "posts", enrichedData.posts.map(pipePost));
      },
    }),

  tag: ({ tag }: { tag: string }) =>
    queryOptions({
      queryKey: createQueryKey(postQueries.all(), "tag", tag),
      queryFn: async () => {
        const data = await postApi.fetchPostsByTag(tag);
        const enrichedData = await mergePostsWithUsers(data);
        return merge<PostsResponse>(enrichedData, "posts", enrichedData.posts.map(pipePost));
      },
    }),
};
