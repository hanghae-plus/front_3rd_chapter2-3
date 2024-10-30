import { apiClient } from '~/shared/api/base';

import { PostRequestDto, PostResponseDto, PostsResponseDto } from '../model/types';

// 게시물 가져오기
export const fetchAllPosts = async ({ limit = 10, skip = 0 }: { limit?: number; skip?: number }) => {
  const res = await apiClient.get<PostsResponseDto>(`/api/posts?limit=${limit}&skip=${skip}`);

  return res;
};

// 게시물 추가
export const addPost = async (post: PostRequestDto) => {
  const res = await apiClient.post<PostResponseDto>('/api/posts/add', post);
  return res;
};

// 게시물 업데이트
export const updatePost = async (id: number, post: PostRequestDto) => {
  const res = await apiClient.put<PostResponseDto>(`/api/posts/${id}`, post);
  return res;
};

// 게시물 삭제
export const deletePost = async (id: number) => {
  const res = await apiClient.delete(`/api/posts/${id}`);
  return res;
};
