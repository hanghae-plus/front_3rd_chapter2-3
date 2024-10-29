import { BaseApi } from "../../../shared/api"
import { User } from "../model/types"

class UsersApi extends BaseApi {
  constructor() {
    super("/api")
  }

  async getUsers(params: {
    limit: number
    select: string
  }): Promise<{ users: User[] }> {
    const queryString = new URLSearchParams(
      params as unknown as URLSearchParams,
    ).toString()
    return this.get<{ users: User[] }>(`/users?${queryString}`)
  }

  async getUser(id: number): Promise<User> {
    return this.get<User>(`/users/${id}`)
  }
}

export const usersApi = new UsersApi()
