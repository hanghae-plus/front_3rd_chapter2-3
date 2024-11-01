import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "../../../entities/user/api"

export const getUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })
}
