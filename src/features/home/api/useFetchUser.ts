import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';

import type { ApiResponse } from '@shared/model/types';
import type { User } from '@/entities/home/model/types';
import { fetchUserById, fetchUserList } from '@/entities/home/api/userApi';

import { userAtom } from '@entities/home/model/userAtoms';

export const useFetchUsers = () => {
  const { data } = useQuery<ApiResponse & { users: User[] }, Error>({
    queryKey: ['users'],
    queryFn: fetchUserList,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { users: data?.users ?? [] };
};

export const useFetchUser = (id: User['id']) => {
  const setUser = useSetAtom(userAtom);

  const { data, isLoading, refetch } = useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => fetchUserById(id),
    enabled: false, // 이 옵션으로 자동 실행을 방지
  });

  useEffect(() => {
    if (data) setUser(data);
  }, [data, setUser]);

  return { isLoading, fetchUser: refetch };
};
