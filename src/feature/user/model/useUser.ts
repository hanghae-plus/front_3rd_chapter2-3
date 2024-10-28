import { useState } from "react";
import { SelectedUser, User } from "../../../temp/types.ts";
import { getUserInfo } from "../../../entities/user/api";

export const useUser = () => {
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<null | SelectedUser>(null);

  const openUserModal = async (user: User | undefined) => {
    if (user) {
      const userData = await getUserInfo(user);

      setSelectedUser(userData);
      setShowUserModal(true);
    }
  };

  return {
    showUserModal,
    selectedUser,
    setShowUserModal,
    openUserModal,
  };
};
