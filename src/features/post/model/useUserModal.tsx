import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { selectedUserAtom, showUserModalAtom } from "../../../entities/user/model/userAtom";
import { User, UserInfo } from "../../../entities/user/api/types";
import { fetchUser } from "../../../entities/user/api/userApi";



const useUserModal = () => {
  const [, setSelectedUser] = useAtom(selectedUserAtom);
  const [, setShowUserModal] = useAtom(showUserModalAtom);

  // 사용자 정보 패칭 Mutation
  const fetchUserMutation = useMutation<UserInfo,Error,number>({
    mutationFn: (userId) => fetchUser(userId),
    onSuccess: (data) => {
      setSelectedUser(data);
      setShowUserModal(true);
    },
  });
  
  // 사용자 모달 열기 함수
  const openUserModal = (userId:User['id']) => {
    fetchUserMutation.mutate(userId);
  };

  return{fetchUserMutation, openUserModal}
}
export default useUserModal;