import { useQuery } from "@tanstack/react-query"
import { fetchAllUser } from "../../../entities/user/api/userApi"

const useQueryUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchAllUser(),
  })
}

export default useQueryUsers
