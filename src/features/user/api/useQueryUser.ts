import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetchUserApi } from "../../../entities/user/api"
import { UserInfo } from "../../../entities/user/model/types"

export const useQueryUser = (userId: number): UseQueryResult<UserInfo> => {
  return useQuery<UserInfo, Error>({
    queryKey: ["user", userId],
    queryFn: () => fetchUserApi(userId),
  })
}
