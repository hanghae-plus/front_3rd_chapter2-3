import { User, UserInfo } from "../../../entities/user/model/types"
import { atom, useAtom } from "jotai"

const showUserModalAtom = atom(false)
const selectedUserAtom = atom<UserInfo | null>(null)

export const useUser = () => {
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return { showUserModal, setShowUserModal, selectedUser, openUserModal }
}
