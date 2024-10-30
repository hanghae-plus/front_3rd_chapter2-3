import { Post } from "../model/types";

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
