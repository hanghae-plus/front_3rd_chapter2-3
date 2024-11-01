import { SelectedUser } from "../../../entities/user/model/types.ts";
import { atom, useAtom } from "jotai";

interface UserAtomState {
  showUserModal: boolean;
  setShowUserModal: (showUserModal: boolean) => void;
  selectedUser: null | SelectedUser;
  setSelectedUser: (selectedUser: null | SelectedUser) => void;
}

export const showUserModalAtom = atom<boolean>(false);
export const selectedUserAtom = atom<null | SelectedUser>(null);

export const useUser = (): UserAtomState => {
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);

  return {
    showUserModal,
    selectedUser,
    setShowUserModal,
    setSelectedUser,
  };
};
