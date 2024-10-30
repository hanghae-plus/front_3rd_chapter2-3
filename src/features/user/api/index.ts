import { User } from "../../../entities/user/model/types"

export const fetchUserDetailApi = async (user: User) => {
  try {
    const response = await fetch(`/api/users/${user.id}`)
    const data = await response.json()

    return data
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error)
  }
}
