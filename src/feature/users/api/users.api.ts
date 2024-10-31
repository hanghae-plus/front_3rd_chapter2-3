import { BaseApi } from "../../../shared/api"
import { User } from "../model/types"

class UsersApi extends BaseApi {
  constructor() {
    super("/api")
  }

  async getUser(id: number): Promise<User> {
    return this.get<User>(`/users/${id}`)
  }
}

export const usersApi = new UsersApi()