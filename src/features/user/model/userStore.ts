import { User } from "../../../entities/user/model/types"
import { atom, useAtom } from "jotai"

const showUserModalAtom = atom(false)
const selectedUserAtom = atom<User | null>(null)

export const useUser = () => {
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  return { showUserModal, setShowUserModal, selectedUser, openUserModal }
}
