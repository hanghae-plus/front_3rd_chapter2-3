import { apiClient } from '~/shared/api/base';

import { TagResponseDto } from '../model/type';

export const fetchAllPostTags = async () => {
  const res = await apiClient.get<TagResponseDto[]>('/api/posts/tags');
  return res;
};
