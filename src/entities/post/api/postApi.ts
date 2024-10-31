import apiInstance from '../../../shared/lib/apiInstance';
import { User } from '../../user/api/types';
import { FetchPostsParams, Post } from './types';

export const fetchPosts = async (params:FetchPostsParams): Promise<Post[]>=> {
  const { limit, skip, tag, search, sortBy, sortOrder } = params;
  let url = `/api/posts?limit=${limit}&skip=${skip}`;

  if (tag && tag !== 'all') url = `/api/posts/tag/${tag}`;
  if (search) url = `/api/posts/search?q=${search}`;
  if (sortBy) url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;

  const postsData = await apiInstance(url);
  const usersData = await apiInstance("/api/users?limit=0&select=username,image");

  const postsWithUsers = postsData.posts.map((post:Post) => ({
    ...post,
    author: usersData.users.find((user:User) => user.id === post.userId),
  }))
  return postsWithUsers;
};

export const addPost = async (newPost: Partial<Omit<Post, 'id' | 'reactions' | 'author'>>): Promise<Post> => {
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