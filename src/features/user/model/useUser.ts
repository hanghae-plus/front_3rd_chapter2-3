import { useQuery } from '@tanstack/react-query';
import { fetchUser } from '../../../entities/user/api/userApi';

export const useUser = (userId:number) => {
  return useQuery({ 
    queryKey: ["user", userId], 
    queryFn: () => fetchUser(userId),
    enabled: !!userId,
  });
};