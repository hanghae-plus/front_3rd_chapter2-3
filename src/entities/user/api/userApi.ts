import apiInstance from '../../../shared/lib/apiInstance';
import { AllUsers, UserInfo } from './types';

// 모든 사용자 가져오기
export const fetchUsers = async (): Promise<AllUsers> => {
  const response = await apiInstance('/api/users?limit=0&select=username,image');
  return response.data;
};

// 특정 사용자 정보 가져오기
export const fetchUser = async (userId:number): Promise<UserInfo> => {
  const response = await apiInstance(`/api/users/${userId}`);
  return response;
};
