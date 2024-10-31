import { User } from "../model/types"

export const userApi = {
  // 사용자 목록 조회
  getUsers: async (): Promise<User[]> => {
    const response = await fetch("/api/users?limit=0&select=username,image")
    const data = await response.json()
    return data.users
  },
}
