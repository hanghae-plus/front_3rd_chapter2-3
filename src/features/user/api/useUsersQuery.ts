import { useQuery } from "@tanstack/react-query"
import { fetchUsersApi } from "../../../entities/user/api"
import { User, UserDTO } from "../../../entities/user/model/types.ts"

export const useUsersQuery = () =>
  useQuery<UserDTO, Error, User[]>({
    queryKey: ["users"],
    queryFn: fetchUsersApi,
    select: (data) => data.users,
  })
