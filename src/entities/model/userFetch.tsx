import { User } from "./atom"

export const userFetch = async (user: User) => {
  try {
    const response = await fetch(`/api/users/${user.id}`)
    const userData = await response.json()

    return userData
    // setSelectedUser(userData)
    // setShowUserModal(true)
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error)
  }
}
