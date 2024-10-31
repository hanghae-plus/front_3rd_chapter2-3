import axios from "axios"

import { User, UserDetail } from "../model/types"

interface FetchUsersParams {
  limit: number
  select: string
}

export const userApi = {
  fetchUsers: async (params: FetchUsersParams): Promise<{ users: User[] }> => {
    const response = await axios.get("/api/users", { params })
    return response.data
  },
  fetchUser: async (id: number): Promise<UserDetail> => {
    const response = await axios.get(`/api/users/${id}`)
    return response.data
  },
}
