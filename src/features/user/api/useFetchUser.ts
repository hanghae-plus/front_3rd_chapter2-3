import { fetchUser, queryKeys } from "@/entities/user"
import { useQuery } from "@tanstack/react-query"

export const useFetchUser = (userId: number) => {
  return useQuery({
    queryFn: async () => {
      return await fetchUser(userId)
    },
    queryKey: queryKeys.FETCH_USER_KEY(userId),
    enabled: userId !== -1,
    retry: false,
  })
}
