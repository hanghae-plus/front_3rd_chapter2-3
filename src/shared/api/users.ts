import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./query-keys"
import type { User } from "@/entities/user/model/types"

export const useUser = (id: number) => {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/users/${id}`)
      if (!response.ok) throw new Error("Failed to fetch user")
      return response.json() as Promise<User>
    },
    enabled: !!id,
  })
}
