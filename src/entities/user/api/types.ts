import { User } from "@/entities/user"

export type ResponseFetchUsers = {
  limit: number
  skip: number
  total: number
  users: User[]
}
