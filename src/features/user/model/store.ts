import { atom, useAtom } from "jotai"
import { User } from "../../../entities/user/model/type"

// jotai atoms
export const showUserModalAtom = atom(false)
export const selectedUserAtom = atom<User | null>(null)

export const useUser = () => {
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  return { showUserModal, setShowUserModal, selectedUser, setSelectedUser }
}
