import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "../../../entities/user/api"

export const getUser = (userId: number) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  })
}
