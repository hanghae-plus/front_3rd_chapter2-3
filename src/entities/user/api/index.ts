import { instance } from "../../../shared/api"
import { ListResponse } from "../../../shared/model/types"
import { User, UserDetail } from "../model/types"

export const fetchUsers = async (): Promise<ListResponse<User, "users">> => {
  const response = await instance.get(`/users?limit=0&select=username,image`)
  return response.data
}
export const searchUsers = async (keyword: string) => {
  const response = await instance.get(`/users/search?q=${keyword}`)
  return response.data
}

export const fetchUser = async (userId: number): Promise<UserDetail> => {
  const response = await instance.get(`/users/${userId}`)
  return response.data
}
