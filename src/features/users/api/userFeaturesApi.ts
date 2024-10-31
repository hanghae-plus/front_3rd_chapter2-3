import { useQuery } from "@tanstack/react-query"
import { fetchUserInfo, fetchUserModalInfo } from "../../../entities/users/api/userEntitiesApi"
import { Users } from "../../../entities/users/model/User"

function useFetchUserinfo() {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUserInfo(),
  })
}

function useFetchUserModalInfo(user: Users) {
  return useQuery({
    queryKey: ["userModalInfo", user],
    queryFn: () => fetchUserModalInfo(user),
  })
}

export { useFetchUserinfo, useFetchUserModalInfo }
