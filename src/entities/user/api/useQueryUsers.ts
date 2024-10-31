import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetchUsersApi } from "../model"
import { UsersData } from "../../../features/user/model/type"

export const useQueryUsers = (): UseQueryResult<UsersData> => {
  return useQuery<UsersData, Error>({
    queryKey: ["user"],
    queryFn: () => fetchUsersApi(),
  })
}
