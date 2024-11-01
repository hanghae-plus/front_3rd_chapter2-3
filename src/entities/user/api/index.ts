import { UserDetail, UserDTO } from "../model/types.ts"

export const fetchUsersApi = async () => {
  try {
    const response = await fetch("/api/users?limit=0&select=username,image")
    const data: UserDTO = await response.json()

    return data
  } catch (error) {
    throw new Error(`사용자 가져오기 오류: ${error}`)
  }
}

export const fetchUserDetailApi = async (id: number) => {
  try {
    const response = await fetch(`/api/users/${id}`)
    const data: UserDetail = await response.json()

    return data
  } catch (error) {
    throw new Error(`사용자 정보 가져오기 오류: ${error}`)
  }
}
