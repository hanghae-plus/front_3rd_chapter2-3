import type { ApiResponse } from '@shared/model/types';
import type { Comment, Post } from '@/entities/home/model/types';

export const fetchCommentsByPostId = async (postId: Post['id']): Promise<ApiResponse & { comments: Comment[] }> => {
  const response = await fetch(`/api/comments/post/${postId}`);
  return await response.json();
};

export const addComment = async (comment: Comment): Promise<Comment> => {
  const response = await fetch('/api/comments/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  return await response.json();
};

export const updateComment = async (comment: Comment): Promise<Comment> => {
  const response = await fetch(`/api/comments/${comment.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  return await response.json();
};

export const deleteComment = async (id: Comment['id']): Promise<void> => {
  await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
  });
};

export const likeComment = async (id: Comment['id']): Promise<void> => {
  await fetch(`/api/comments/${id}/like`, {
    method: 'PATCH',
  });
};
