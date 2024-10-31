import { fetchUserFetch } from "../../../entities/user/api"
import { User } from "../../../entities/user/model/types"

interface Props {
  user: User
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>
  setShowUserModal: React.Dispatch<React.SetStateAction<boolean>>
}

// 사용자 모달 열기
export const openUserModal = async ({ user, setSelectedUser, setShowUserModal }: Props) => {
  try {
    const userData = await fetchUserFetch(user.id)
    setSelectedUser(userData)
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error)
  }
  setShowUserModal(true)
}
