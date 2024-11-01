import { useQuery } from "@tanstack/react-query"
import { fetchUsers, queryKeys } from "@/entities/user"

export const useFetchUsers = (request: string) => {
  return useQuery({
    queryFn: async () => {
      return await fetchUsers(request)
    },
    queryKey: queryKeys.FETCH_USERS_KEY(request),
  })
}
