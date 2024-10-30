import { userApi } from "@/entities/user/api/user-api";
import { findById } from "@/shared/lib/array";
import { pipe } from "@/shared/lib/function";
import { merge } from "@/shared/lib/object";
import { Post, PostsResponse } from "../model/types";

export const withDefaultAuthor = (post: Post) => ({
  ...post,
  author: post.author ?? { id: 999, username: "John Doe", image: "" },
});

export const withDefaultTags = (post: Post) => ({
  ...post,
  tags: post.tags ?? [],
});

export const withDefaultReactions = (post: Post) => ({
  ...post,
  reactions: post.reactions ?? { likes: 0, dislikes: 0 },
});

export const mergePostsWithUsers = async (data: PostsResponse) => {
  const users = await userApi.getUsers({ select: ["username", "image"] });
  const withUsers = data.posts.map((post) => ({
    ...post,
    author: findById(users, post.userId),
  }));

  return merge<PostsResponse>(data, "posts", withUsers);
};

export const defaultPostPipeData = pipe(withDefaultAuthor, withDefaultTags, withDefaultReactions);
