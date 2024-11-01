import { BaseApi } from "@/shared/api"
import { ResponseFetchUsers, User } from "@/entities/user"

const userApi = new BaseApi("users")

export const fetchUsers = async (param: string): Promise<ResponseFetchUsers> => await userApi.get(param)

export const fetchUser = async (id: number): Promise<User> => {
  const subPath = `/${id}`
  return await userApi.get(subPath)
}
