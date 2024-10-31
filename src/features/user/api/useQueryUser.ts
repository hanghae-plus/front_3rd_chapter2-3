import { useQuery } from "@tanstack/react-query"
import { fetchUserFetch } from "../../../entities/user/api"

const useQueryUser = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserFetch(id),
  })
}

export default useQueryUser
