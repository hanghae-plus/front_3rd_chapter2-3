import { useQuery } from "@tanstack/react-query"
import { fetchUserModalInfo } from "../../../entities/users/api/userEntitiesApi"
import { Users } from "../../../entities/users/model/User"

const useFetchUserModalInfo = (user: Users) => {
  return useQuery({
    queryKey: ["userModalInfo", user],
    queryFn: () => fetchUserModalInfo(user),
    staleTime: 0,
    gcTime: 600000,
    enabled: true,
  })
}

export { useFetchUserModalInfo }
