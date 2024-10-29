import { Users } from "../model/User"
import useUserState from "../state/useUserState"

export const useFetchUsers = () => {
  const { setSelectedUser, setShowUserModal } = useUserState()

  // 사용자 모달 열기
  const openUserModal = async (user: Users) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return { openUserModal }
}
