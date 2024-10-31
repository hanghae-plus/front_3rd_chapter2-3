import apiInstance from '../../../shared/lib/apiInstance';
import { Comment, CommentList } from './types';

// 댓글 가져오기
export const fetchComments = async (postId: number): Promise<CommentList>  => {
  const response = await apiInstance(`/api/comments/post/${postId}`);
  return response;
};

// 댓글 추가
export const addComment = async (newComment:{ body: string; postId: number | null; userId: number; }): Promise<Comment> => {
  const response = await apiInstance('/api/comments/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newComment),
  });
  return response;
};

// 댓글 업데이트
export const updateComment = async (updatedComment: Partial<Comment> & { id: number }): Promise<Comment> => {
  const response = await apiInstance(`/api/comments/${updatedComment.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body: updatedComment.body }),
  });
  return response;
};

// 댓글 삭제
export const deleteComment = async (id: number): Promise<{ success: boolean }> => {
  const response = await apiInstance(`/api/comments/${id}`, { method: 'DELETE' });
  return response;
};

// 댓글 좋아요
export const likeComment = async (id: number, currentLikes: number): Promise<Comment> => {
  const response = await apiInstance(`api/comments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes: currentLikes + 1 }),
  });
  return response;
};
