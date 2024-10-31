import { axiosInstance } from "../../../shared/api/axiosInstance"
import { useCommonQuery } from "../../../shared/lib/query/useCommonQuery"
import { usersApi } from "../api/userApi"
import { User } from "../model/userTypes"

export const useUsersQuery = () => {
  return useCommonQuery<User[]>({
    queryKey: ["users"],
    queryFn: usersApi.getUsers,
  })
}

// 선택적: 단일 사용자를 위한 쿼리도 추가
export const useUserQuery = (userId: number) => {
  return useCommonQuery<User>({
    queryKey: ["users", userId],
    queryFn: async () => {
      const { data: res } = await axiosInstance.get(`/user/${userId}`)
      return res
    },
    params: userId,
  })
}
