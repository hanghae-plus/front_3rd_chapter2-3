import { UsersDto } from './types';

export const getUsers = async (): Promise<UsersDto> => {
  const response = await fetch('/api/users?limit=0&select=username,image');
  const data = await response.json();
  return data;
};
