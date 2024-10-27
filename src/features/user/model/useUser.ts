import { useState } from "react"
import { User, UserInfo } from "../../../entities/user/model/types"

export const useUser = () => {
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null)

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
