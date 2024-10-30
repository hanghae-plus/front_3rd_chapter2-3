import { useState } from "react";
import { SelectedUser } from "../../../entities/user/model/types.ts";

export const useUser = () => {
  const [showUserModal, setShowUserModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<null | SelectedUser>(null);

  return {
    showUserModal,
    selectedUser,
    setShowUserModal,
    setSelectedUser,
  };
};
