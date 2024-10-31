import { User_i } from "../model/types"

export const userApi = {
  fetchUser: async (user: User_i): Promise<User_i> => {
    const response = await fetch(`/api/users/${user.id}`)

    if (!response.ok) {
      throw new Error("사용자 정보 가져오기 실패")
    }

    return response.json()
  },
}
