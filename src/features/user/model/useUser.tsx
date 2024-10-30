import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../../entities/user/api/userApi.js';
import { AllUsers } from '../../../entities/user/api/types.js';

const useUser = () => {
  // const fetchAllUser = useQuery<AllUsers,Error,undefined>({
  //   queryKey: ['posts'],
  //   queryFn: fetchUsers,
  // });


  // return{fetchAllUser}
};

export default useUser;