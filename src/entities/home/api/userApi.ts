import type { ApiResponse } from '@shared/model/types';
import type { User } from '@/entities/home/model/types';

export const fetchUserList = async (): Promise<ApiResponse & { users: User[] }> => {
  const response = await fetch('/api/users?limit=0&select=username,image');
  const data = await response.json();
  return data;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(
    `/api/users/${id}?select=image,username,firstName,lastName,age,email,phone,address,company`,
  );

  const data = await response.json();
  return data;
};
