import type { Post, User } from '../model/types';

export const enrichPostsWithUsers = (posts: Post[], users: User[]) =>
  posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId),
  }));
