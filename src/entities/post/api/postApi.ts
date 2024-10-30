import apiInstance from '../../../shared/lib/apiInstance';
import { FetchPostsParams, Post, Posts } from './types';

export const fetchPosts = async (params:FetchPostsParams): Promise<Posts>=> {
  const { limit, skip, tag, search, sortBy, sortOrder } = params;
  let url = `/api/posts?limit=${limit}&skip=${skip}`;

  if (tag && tag !== 'all') url += `&tag=${tag}`;
  if (search) url += `&search=${search}`;
  if (sortBy) url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;

  return await apiInstance(url);
};

export const addPost = async (newPost: Omit<Post, 'id' | 'reactions' | 'author'>): Promise<Post> => {
  const response = await apiInstance('/api/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });
  return response.data;
};

export const updatePost = async (updatedPost: Partial<Post> & { id: number }): Promise<Post> => {
  const response = await apiInstance(`/api/posts/${updatedPost.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  });
  return response.data;
};

export const deletePost = async (id: number): Promise<{ success: boolean }>=> {
  const response = await apiInstance(`/api/posts/${id}`, { method: 'DELETE' });
  return response.data;
};
