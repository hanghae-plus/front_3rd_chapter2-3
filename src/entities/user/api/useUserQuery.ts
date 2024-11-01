import { useQuery } from "@tanstack/react-query"
import { userApi } from "./userApi"

export const useUsersQuery = ({ limit, select }: { limit: number; select: string }) => {
  return useQuery({
    queryKey: ["users", { limit, select }],
    queryFn: async () => {
      try {
        return await userApi.fetchUsers({ limit, select })
      } catch (error) {
        console.error("유저 가져오기 오류:", error)
        throw error
      }
    },
  })
}

export const useUserQuery = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      try {
        return await userApi.fetchUser(id)
      } catch (error) {
        console.error("유저 가져오기 오류:", error)
        throw error
      }
    },
  })
}
