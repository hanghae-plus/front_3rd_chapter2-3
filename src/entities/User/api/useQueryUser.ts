import { useQuery } from "@tanstack/react-query"
import { userApi } from "."
import { UsersQueryProps, UsersResponseType } from "../model/types"

export const useQueryUser = ({ limit = 0, select = "username,image" }: UsersQueryProps) => {
  return useQuery<UsersResponseType, Error>({
    queryKey: ["users", { limit, select }],
    queryFn: async () => {
      const response = await userApi.fetchUsers(limit, select)
      return response.data
    },
    staleTime: 5 * 60 * 1000,
  })
}
