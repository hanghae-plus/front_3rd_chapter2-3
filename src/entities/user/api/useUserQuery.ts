import { useQuery } from "@tanstack/react-query"
import { UserDTO } from "../model/types"
import { userQueryKeys } from "./user.queries"
import { userApi } from "./userApi"

export const useUserQuery = (userId: UserDTO["id"]) => {
  return useQuery({
    queryKey: userQueryKeys.detail(userId),
    queryFn: () => userApi.fetchUser(userId),
  })
}
