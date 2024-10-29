import { User } from "../model/User"

interface Props {
  user: User
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>
  setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>
}

// 사용자 모달 열기
export const openUserModal = async ({ user, setSelectedUser, setShowUserModal }: Props) => {
  try {
    const response = await fetch(`/api/users/${user.id}`)
    const userData = await response.json()
    setSelectedUser(userData)
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error)
  }
  setShowUserModal(true)
}
