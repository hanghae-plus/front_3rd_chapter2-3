import apiInstance from '../../../shared/lib/apiInstance';

export const fetchUsers = async () => {
  const response = await apiInstance('/api/users?limit=0&select=username,image');
  return response.data;
};

export const fetchUser = async (userId) => {
  const response = await apiInstance(`/api/users/${userId}`);
  return response.data;
};
