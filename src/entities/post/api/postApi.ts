import apiInstance from '../../../shared/lib/apiInstance';

// src/entities/post/api/postApi.js
export const fetchPosts = async (params) => {
  const { limit, skip, tag, search, sortBy, sortOrder } = params;
  let url = `/api/posts?limit=${limit}&skip=${skip}`;

  if (tag && tag !== 'all') url += `&tag=${tag}`;
  if (search) url += `&search=${search}`;
  if (sortBy) url += `&sortBy=${sortBy}&sortOrder=${sortOrder}`;

  return await apiInstance(url);
};

export const addPost = async (newPost) => {
  const response = await apiInstance('/api/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPost),
  });
  return response.data;
};

export const updatePost = async (updatedPost) => {
  const response = await apiInstance(`/api/posts/${updatedPost.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedPost),
  });
  return response.data;
};

export const deletePost = async (id) => {
  const response = await apiInstance(`/api/posts/${id}`, { method: 'DELETE' });
  return response.data;
};
