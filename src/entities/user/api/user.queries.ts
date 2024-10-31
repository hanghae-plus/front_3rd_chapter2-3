import { UserDTO } from "../model/types"

export const userQueryKeys = {
  all: () => ["user"] as const,

  details: () => [...userQueryKeys.all(), "detail"] as const,
  detail: (userId: UserDTO["id"]) =>
    [...userQueryKeys.details(), userId] as const,
} as const
