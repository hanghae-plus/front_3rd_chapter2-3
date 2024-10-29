import { User } from "../types"

export interface UsersData {
  users: User[]
  total: number
}

// 사용자 목록 가져오기
export const fetchUsersApi = async (): Promise<UsersData> => {
  try {
    const response = await fetch("/api/users?limit=0&select=username,image")
    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`사용자 가져오기 오류: ${error}`)
  }
}
