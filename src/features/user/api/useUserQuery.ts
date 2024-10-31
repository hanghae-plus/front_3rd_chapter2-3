import { useQuery } from "@tanstack/react-query"
import { User_i } from "../../../entities/user/model/types"
import { userApi } from "../../../entities/user/api/userApis"

export const useUserQuery = (user: User_i) => {
  return useQuery<User_i>({
    queryKey: ["user", user.id],
    queryFn: () => userApi.fetchUser(user),
    onSuccess: (data) => {
      console.log("데이터 로드 성공:", data)
    },
  })
}
