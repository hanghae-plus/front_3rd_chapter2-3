import { atom, useAtom } from "jotai"
import { UserDetail } from "../../../entities/user/model/types"

const showUserModalAtom = atom(false)
const selectedUserAtom = atom<UserDetail | null>(null)

export const useUserModal = () => {
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  return { showUserModal, setShowUserModal, selectedUser, setSelectedUser }
}
