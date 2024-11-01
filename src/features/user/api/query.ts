import { useQuery } from "@tanstack/react-query"
import { userApi } from "../../../entities/user/api/userApi"

export const userKeys = {
  all: ["users"],
  user: (userId: number) => ["users", userId],
}

export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: () => userApi.get.users({ limit: 0, select: "username,image" }),
  })
}

export const useUserById = (userId: number) => {
  return useQuery({
    queryKey: userKeys.user(userId),
    queryFn: () => userApi.get.userById({ limit: 0, id: userId }),
  })
}
