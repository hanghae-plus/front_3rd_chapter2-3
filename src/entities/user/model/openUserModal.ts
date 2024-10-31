import { UserType } from "../../../shared/type"
import useUserStore from "./useUserStore"

export const openUserModal = async (user: UserType) => {
  const { setSelectedUser, setShowUserModal } = useUserStore.getState() // Zustand store 상태 가져오기

  try {
    const response = await fetch(`/api/users/${user.id}`)
    const userData = await response.json()
    setSelectedUser(userData)
    setShowUserModal(true)
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error)
  }
}
