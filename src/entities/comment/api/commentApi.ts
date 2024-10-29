import apiInstance from '../../../shared/lib/apiInstance';

// 댓글 가져오기
export const fetchComments = async (postId) => {
  const response = await apiInstance(`/api/comments/post/${postId}`);
  return response;
};

// 댓글 추가
export const addComment = async (newComment) => {
  const response = await apiInstance('/api/comments/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newComment),
  });
  return response;
};

// 댓글 업데이트
export const updateComment = async (updatedComment) => {
  const response = await apiInstance(`/api/comments/${updatedComment.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body: updatedComment.body }),
  });
  return response;
};

// 댓글 삭제
export const deleteComment = async (id) => {
  const response = await apiInstance(`/api/comments/${id}`, { method: 'DELETE' });
  return response;
};

// 댓글 좋아요
export const likeComment = async ({ id, likes }) => {
  const response = await apiInstance(`api/comments/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes: likes + 1 }),
  });
  return response;
};
