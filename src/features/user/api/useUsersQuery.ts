import { useQuery } from "@tanstack/react-query"
import { fetchUsersApi } from "../../../entities/user/api"

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersApi,
    staleTime: Infinity,
  })
}
