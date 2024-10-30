import { User } from "../../../entities/user/model/type"

export type UsersData = {
  users: User[]
  total: number
  skip: number
  limit: number
}
