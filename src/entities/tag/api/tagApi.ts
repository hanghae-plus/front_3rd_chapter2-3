import { PostsResponseDto } from '~/entities/post/api/type';

import { apiClient } from '~/shared/api/base';

import { TagResponseDto } from './type';

export const fetchAllPostTags = async () => {
  const res = await apiClient.get<TagResponseDto[]>('/api/posts/tags');
  return res;
};

export const fetchPostsByTag = async (tag: string) => {
  const res = await apiClient.get<PostsResponseDto>(`/api/posts/tag/${tag}`);
  return res;
};
