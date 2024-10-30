import { safeFetch } from "../../../shared/lib"
import { UsersResponse } from "../../post/model/types"
import { User } from "../model/types"

export const userApi = {
  fetchUser: async (userId: number) => {
    try {
      const response = await safeFetch<User>(`/api/users/${userId}`)
      return response
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
      throw error
    }
  },

  fetchUsers: async () => {
    try {
      const response = safeFetch<UsersResponse>(
        "/api/users?limit=0&select=username,image",
      )
      return response
    } catch (error) {
      console.error("사용자 정보 목록 가져오기 오류:", error)
      throw error
    }
  },
}
