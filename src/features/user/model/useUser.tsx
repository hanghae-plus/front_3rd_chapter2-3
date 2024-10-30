import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../../entities/user/api/userApi.js';
import { AllUsers } from '../../../entities/user/api/types.js';

const useUser = () => {
  return useQuery<AllUsers,Error>({
    queryKey: ['user'],
    queryFn: fetchUsers,
  });

};

export default useUser;