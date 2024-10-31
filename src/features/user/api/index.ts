import { fetchUserApi } from "../../../entities/user/api"
import { User } from "../../../entities/user/model/types"

export const usersApi = {
  fetch: (id: number): Promise<User> => fetchUserApi(id),
}
