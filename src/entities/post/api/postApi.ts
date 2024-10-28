import { Post, PostsResponse } from "@/entities/post/model/types";

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
    .map(([key, value]) => (value ? `${key}=${value}` : ""))
    .join("&");

  const postsResponse = await fetch(`/api/posts?${queries}`);
  const postsData: PostsResponse = await postsResponse.json();

  return {
    posts: postsData.posts,
    total: postsData.total,
  };
};

const addPost = async (newPost: Post) => {
  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
  });
  const data = await response.json();
  return data;
};

const updatePost = async (updatedPost: Post) => {
  const response = await fetch(`/api/posts/${updatedPost.id}`, {
    method: "PUT",
    body: JSON.stringify(updatedPost),
  });
  const data = await response.json();
  return data;
};

const deletePost = async (id: string) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const postApi = {
  getPosts: fetchPosts,
  addPost: addPost,
  updatePost: updatePost,
  deletePost: deletePost,
};
