import { UserDetailDto, UsersDto } from './types';

export const getUsers = async (): Promise<UsersDto> => {
  const response = await fetch('/api/users?limit=0&select=username,image');
  const data = await response.json();
  return data;
};

export const getUser = async (id: number): Promise<UserDetailDto> => {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();
  return data;
};
