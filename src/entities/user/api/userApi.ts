import { apiClient } from '~/shared/api/base';

import { UserResponseDto, UsersResponseDto } from '../model/types';

export const fetchAllUser = async () => {
  // FIXME: query parameter config.param에서 집어넣기
  const res = await apiClient.get<UsersResponseDto>('/api/users?limit=0&select=username,image');
  return res;
};

export const fetchUserById = async (userId: number) => {
  const res = await apiClient.get<UserResponseDto>(`/api/users/${userId}`);
  return res;
};
