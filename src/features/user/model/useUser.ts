import { atom, useAtom } from "jotai"
import { User, UserDetail } from "../../../entities/user/model/types"
import { fetchUserDetail } from "../api"

const showUserModalAtom = atom(false)
const selectedUserAtom = atom<UserDetail | null>(null)

export const useUser = () => {
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  const openUserModal = async (user: User) => {
    const userDetailData = await fetchUserDetail(user)

    setSelectedUser(userDetailData)
    setShowUserModal(true)
  }

  return { showUserModal, setShowUserModal, selectedUser, openUserModal }
}
