import { atom, useAtom } from "jotai";
import { UserType } from "../../../entities/user";

const selectedUserAtom = atom<UserType | null>(null);
const showUserModalAtom = atom<boolean>(false);

export const useUser = () => {
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom);

  const openUserModal = async (userId: UserType["id"]) => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setSelectedUser(userData);
      setShowUserModal(true);
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error);
    }
  };

  return new (class {
    selectedUser = selectedUser;
    showUserModal = showUserModal;
    setSelectedUser = setSelectedUser;
    setShowUserModal = setShowUserModal;
    openUserModal = openUserModal;
  })();
};
