import { NewPost, Post, PostsResponse } from "@/entities/post/model/types";

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

const addPost = async (newPost: NewPost) => {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  const data = await response.json();
  return data;
};

const updatePost = async (updatedPost: Post) => {
  const response = await fetch(`/api/posts/${updatedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  });
  const data = await response.json();
  return data;
};

const deletePost = async (id: number) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

const searchPosts = async (search: string) => {
  const response = await fetch(`/api/posts/search?q=${search}`);
  const data = await response.json();
  return data as PostsResponse;
};

const fetchPostsByTag = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`);
  const data = await response.json();
  return data as PostsResponse;
};

export const postApi = {
  getPosts: fetchPosts,
  addPost: addPost,
  updatePost: updatePost,
  deletePost: deletePost,
  searchPosts: searchPosts,
  fetchPostsByTag: fetchPostsByTag,
};
