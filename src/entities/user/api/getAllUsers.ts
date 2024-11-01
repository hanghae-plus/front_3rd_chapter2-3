import { User, UserList } from "@entities/user/model"

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch("/api/users?limit=0", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data: UserList = await response.json()
    return data.users
  } catch (error) {
    console.error("사용자 목록 조회 오류:", error)
    throw new Error(`사용자 목록 조회 오류: ${error}`)
  }
} 