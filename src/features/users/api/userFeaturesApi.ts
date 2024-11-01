import { useQuery } from "@tanstack/react-query"
import { fetchUserInfo, fetchUserModalInfo } from "../../../entities/users/api/userEntitiesApi"
import { Users } from "../../../entities/users/model/User"

const useFetchUserinfo = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUserInfo(),
  })
}

const useFetchUserModalInfo = (user: Users) => {
  return useQuery({
    queryKey: ["userModalInfo", user],
    queryFn: () => fetchUserModalInfo(user),
  })
}

export { useFetchUserinfo, useFetchUserModalInfo }
