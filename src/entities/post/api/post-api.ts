import { NewPost, Post, PostsResponse } from "@/entities/post/model/types";
import { createRequestOptions, fetchApi } from "@/shared/lib/api";
import { POST_API_PATHS } from "../config/post-api-paths";

//query
const fetchPosts = async ({ limit, skip }: { limit: number; skip: number }): Promise<PostsResponse> => {
  const postsResponse = await fetchApi<PostsResponse>(POST_API_PATHS.base, {
    searchParams: { limit, skip },
  });
  return postsResponse;
};

//query
const searchPosts = async (search: string) => {
  const response = await fetchApi<PostsResponse>(POST_API_PATHS.search, {
    searchParams: { q: search },
  });
  return response;
};

//query
const fetchPostsByTag = async (tag: string) => {
  const response = await fetchApi<PostsResponse>(POST_API_PATHS.byTag(tag));
  return response;
};

// ======================================================

//mutate
const addPost = async (newPost: NewPost) => {
  const response = await fetchApi<Post>(POST_API_PATHS.add, createRequestOptions("POST", newPost));
  return response;
};

//mutate
const updatePost = async (updatedPost: Post) => {
  const response = await fetchApi<Post>(
    POST_API_PATHS.update(updatedPost.id),
    createRequestOptions("PUT", updatedPost),
  );
  return response;
};

//mutate
const deletePost = async (id: number) => {
  const response = await fetchApi<Post>(POST_API_PATHS.delete(id), createRequestOptions("DELETE"));
  return response;
};

export const postApi = Object.freeze({
  getPosts: fetchPosts,
  addPost: addPost,
  updatePost: updatePost,
  deletePost: deletePost,
  searchPosts: searchPosts,
  fetchPostsByTag: fetchPostsByTag,
});
