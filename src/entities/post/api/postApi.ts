import { NewPost, Post, PostsResponse } from "@/entities/post/model/types";

const fetchPosts = async ({ limit, skip }: { limit: number; skip: number }): Promise<PostsResponse> => {
  const postsResponse = await fetch(`/api/posts?limit=${limit}&skip=${skip}`);
  const postsData: PostsResponse = await postsResponse.json();
  return postsData;
};

const addPost = async (newPost: NewPost) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  });
  const data = await response.json();
  return data as Post;
};

const updatePost = async (updatedPost: Post) => {
  const response = await fetch(`/api/posts/${updatedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedPost),
  });
  const data = await response.json();
  return data as Post;
};

const deletePost = async (id: number) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data as Post;
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
