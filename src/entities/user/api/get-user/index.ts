import { useQuery } from "@tanstack/react-query"
import { GetUserParams, User } from "../../model/types"

export const getUser = async (id: number): Promise<User> => {
  const response = await fetch(`/api/users/${id}`)
  const data = await response.json()

  return data
}

export const getUsers = async (): Promise<{ users: User[] }> => {
  const response = await fetch("/api/users?limit=0&select=username,image")
  const data = await response.json()

  return data
}

export const useUser = (params: GetUserParams) => {
  const { userId } = params

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    initialData: {} as User,
    enabled: !!userId,
  })
}

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    initialData: { users: [] },
  })
}
