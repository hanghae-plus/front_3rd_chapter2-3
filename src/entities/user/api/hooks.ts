import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "./api"
import { UserId } from "@/shared/types"

export const useQueryUser = (userId: UserId) => {
  const query = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  })

  return query
}
