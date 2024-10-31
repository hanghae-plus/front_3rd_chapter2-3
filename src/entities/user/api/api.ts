import { UserId } from "@/shared/types"

// 사용자 조회
export const fetchUser = async (userId: UserId) => {
  const response = await fetch(`/api/users/${userId}`)
  const data = await response.json()

  return data
}
