import { User } from "@entities/user/types"

export const fetchUserApi = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`/api/users/${id}`)
    return (await response.json()) as User
  } catch (e) {
    throw new Error("Failed to fetch user data: " + e)
  }
}
