import { User } from "@entities/user/model"

export const getUserById = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("사용자 조회 오류:", error)
    throw new Error(`사용자 조회 오류: ${error}`)
  }
} 