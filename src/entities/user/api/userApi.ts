import { safeFetch } from "../../../shared/api"
import { UserDTO } from "../model/types"

export const userApi = {
  /** 사용자 정보 가져오기 */
  fetchUser: async (userId: number) => {
    try {
      const response = await safeFetch<UserDTO>(`/api/users/${userId}`)
      return response
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
      throw error
    }
  },
}
