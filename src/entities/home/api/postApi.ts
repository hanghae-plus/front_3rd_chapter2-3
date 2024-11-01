// features/post/api/postApi.ts
import type { ApiResponse } from '@shared/model/types';
import type { NewPost, Post } from '@/entities/home/model/types';

type PostQueryParams = {
  tag?: string;
  search?: string;
  limit: number;
  skip: number;
  sortBy?: string;
  sortOrder?: string;
};

const createPostQueryString = (params: Omit<PostQueryParams, 'tag' | 'search'>) => {
  const baseQuery = `?limit=${params.limit}&skip=${params.skip}`;
  const sortQuery = params.sortBy ? `&sortBy=${params.sortBy}` : '';
  const orderQuery = params.sortOrder ? `&order=${params.sortOrder}` : '';

  return `${baseQuery}${sortQuery}${orderQuery}`;
};

export const fetchPostList = async (
  params: Omit<PostQueryParams, 'tag' | 'search'>,
): Promise<ApiResponse & { posts: Post[] }> => {
  const response = await fetch(`/api/posts${createPostQueryString(params)}`);
  const data = await response.json();
  return data;
};

export const fetchPostListByTag = async (
  params: Omit<PostQueryParams, 'search'>,
): Promise<ApiResponse & { posts: Post[] }> => {
  const response = await fetch(`/api/posts/tag/${params.tag}${createPostQueryString(params)}`);
  const data = await response.json();
  return data;
};

export const fetchPostListBySearch = async (
  params: Omit<PostQueryParams, 'tag'>,
): Promise<ApiResponse & { posts: Post[] }> => {
  const response = await fetch(
    `/api/posts/search?q=${params.search}${createPostQueryString(params).replace('?', '&')}`,
  );
  const data = await response.json();
  return data;
};

const createPostRequestConfig = (post: Post | NewPost) => ({
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(post),
});

export const createPost = async (post: NewPost): Promise<NewPost & { id: number }> => {
  const response = await fetch('/api/posts/add', {
    method: 'POST',
    ...createPostRequestConfig(post),
  });
  return response.json();
};

export const updatePostById = async (post: Post): Promise<Omit<Post, 'author' | 'views'>> => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: 'PUT',
    ...createPostRequestConfig(post),
  });
  return response.json();
};

export const deletePostById = async (postId: number): Promise<void> => {
  await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
  });
};
