import { UserDetailDto } from '../api/types';
import { UserDetail } from '../model/types';

export const transformUserDetail = (user: UserDetailDto): UserDetail => {
  return {
    ...user,
  };
};
