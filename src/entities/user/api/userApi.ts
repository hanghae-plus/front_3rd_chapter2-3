import { apiClient } from '~/shared/api/base';

import { UsersResponseDto } from './type';

export const fetchAllUser = async () => {
  // FIXME: query parameter config.param에서 집어넣기
  const res = await apiClient.get<UsersResponseDto>('/api/users?limit=0&select=username,image');
  return res;
};
