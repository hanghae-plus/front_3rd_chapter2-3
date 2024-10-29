import { apiClient } from '~/shared/api/base';

import { CommentRequestDto, CommentResponseDto, CommentsResponseDto } from './type';

export const fetchAllCommentsByPostId = async (postId: number) => {
  const res = await apiClient.get<CommentsResponseDto>(`/api/comments/post/${postId}`);

  return res;
};

// 댓글 추가
export const addComment = async (comment: CommentRequestDto) => {
  const res = await apiClient.post<CommentResponseDto>('/api/comments/add', comment);
  return res;
};

// 댓글 업데이트
export const updateComment = async (id: number, body: string) => {
  const res = await apiClient.put<CommentResponseDto>(`/api/comments/${id}`, { body });
  return res;
};

// 댓글 삭제
export const deleteComment = async (id: number) => {
  const res = await apiClient.delete(`/api/comments/${id}`);
  return res;
};
