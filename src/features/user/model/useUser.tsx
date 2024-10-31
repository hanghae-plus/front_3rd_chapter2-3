// src/features/posts/hooks/useUser.ts
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { selectedUserAtom } from '../../../entities/user/model/userAtom';
import { UserInfo } from '../../../entities/user/api/types';
import { fetchUser, fetchUsers } from '../../../entities/user/api/userApi';
import { useCallback } from 'react';

const useUser = () => {
  const [, setSelectedUser] = useAtom(selectedUserAtom);

  // onSuccess 콜백을 useCallback으로 감싸 안정적인 참조 유지
  const onSuccess = useCallback((data: UserInfo) => {
    setSelectedUser(data);
  }, [setSelectedUser]);

  const onError = useCallback((error:Error) => {
    console.error('사용자 정보 가져오기 오류:', error);
    // 필요 시 사용자에게 에러 메시지 표시
    alert('사용자 정보를 불러오는 데 실패했습니다.');
  }, []);

  // 사용자 정보 패칭 Mutation
  const fetchUserMutation = useMutation<UserInfo, Error, number>({
    mutationFn: (userId) => fetchUser(userId),
    onSuccess,
    onError,
  });

  const getAllUsers = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  
  return { fetchUserMutation ,getAllUsers};
};

export default useUser;