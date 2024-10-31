import { axiosInstance } from "../../../shared/api/axiosInstance"
import { User } from "../model/userTypes"

export const usersApi = {
  getUsers: async () => {
    const { data: res } = await axiosInstance.get(`/user?limit=0&select=username,image`)
    return res
  },
  getUser: async (userId: number) => {
    const { data: res } = await axiosInstance.get<User>(`/user/${userId}`)
    return res
  },
}
