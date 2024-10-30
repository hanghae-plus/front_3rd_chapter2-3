import { User } from "@/entities/user/model/types";
import useToggle from "@/shared/model/useToggle";
import { useCallback } from "react";
import { useGetUser } from "../api/use-get-user";
import useUserStore from "../model/useUserStore";

export const useModalUser = (userId: number) => {
  const { isOpen, toggle } = useToggle();
  const handleSelectUser = useUserStore((state) => state.handleSelectUser);
  const { data: userData } = useGetUser(userId);

  const openUserModal = useCallback(
    (user?: User) => {
      if (!user) return;
      handleSelectUser(user);
    },
    [handleSelectUser],
  );

  return {
    isOpen,
    toggle,
    openUserModal,
    userData,
  };
};
