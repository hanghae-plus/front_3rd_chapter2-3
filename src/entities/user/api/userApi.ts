import { safeFetch } from "../../../shared/lib"
import { User } from "../model/types"

export const userApi = {
  fetchUser: async (userId: number) => {
    try {
      const response = await safeFetch<User>(`/api/users/${userId}`)
      return response
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  },
}
