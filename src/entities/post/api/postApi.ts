import { User } from "@/entities/user/model/types";
import { Post, PostsResponse } from "../model/types";

type FetchPostsProps = {
  limit?: number;
  skip?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  tag?: string;
};

const fetchPosts = async (props: FetchPostsProps): Promise<{ posts: Post[]; total: number }> => {
  const queries = Object.entries(props)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  // get posts
  const postsResponse = props.tag
    ? await fetch(`/api/posts/tag/${props.tag}?${queries}`)
    : await fetch(`/api/posts?${queries}`);
  const postsData: PostsResponse = await postsResponse.json();

  // get users
  const usersResponse = await fetch("/api/users?limit=0&select=username,image");
  const usersData = await usersResponse.json();
  const users: Pick<User, "id" | "username" | "image">[] = usersData.users;

  // add users to posts
  const postsWithUsers = postsData.posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.userId),
  }));

  return {
    posts: postsWithUsers,
    total: postsData.total,
  };
};

export const postApi = {
  getAll: fetchPosts,
};
