import { useState } from "react";
import { getUserInfo } from "../../../entities/user/api";
import { SelectedUser, User } from "../../../entities/user/model/types.ts";

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
