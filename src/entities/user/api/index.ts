import { instance } from "../../../shared/api"

export const fetchUsers = async (limit: number, skip: number) => {
  const response = await instance.get(`/users?limit=${limit}&skip=${skip}`)
  return response.data
}
export const searchUsers = async (keyword: string) => {
  const response = await instance.get(`/users/search?q=${keyword}`)
  return response.data
}
