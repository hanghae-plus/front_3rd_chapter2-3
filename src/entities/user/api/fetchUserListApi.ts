import { User } from "@entities/user/types"

export const fetchUserListApi = async (): Promise<User[]> => {
  try {
    const response = await fetch("/api/users?limit=0")
    return (await response.json()).users as User[]
  } catch (e) {
    throw new Error("Failed to fetch user list data: " + e)
  }
}
