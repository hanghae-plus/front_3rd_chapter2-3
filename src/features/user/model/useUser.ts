import { atom, useAtom } from "jotai"
import { User } from "../../../shared/type"

const selectedUserAtom = atom<User | null>(null)
const showUserModalAtom = atom<boolean>(false)

export const useUser = () => {
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)

  return {
    selectedUser,
    setSelectedUser,
    showUserModal,
    setShowUserModal,
  }
}
