import { User } from "../model/types"

const BASE_URL = "/api/users"

export const usersAPI = {
  getUsers: async (): Promise<{ users: User[] }> => {
    const response = await fetch(`${BASE_URL}?limit=0&select=username,image`)
    return response.json()
  },

  getUser: async (id: number): Promise<User> => {
    const response = await fetch(`${BASE_URL}/${id}`)
    return response.json()
  },
}
