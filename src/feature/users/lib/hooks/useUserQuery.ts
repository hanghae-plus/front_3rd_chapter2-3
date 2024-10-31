import { useQuery } from "@tanstack/react-query"
import { usersApi } from "../../api/users.api"

export const userKeys = {
  all: ["users"],
  detail: (id: number) => [...userKeys.all, "detail", id] as const,
}

export const useUserQuery = (id: number | null) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => usersApi.getUser(id),
    enabled: id !== null,
  })
}