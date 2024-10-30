import { useQuery } from "@tanstack/react-query"
import { getUserInfo } from "../../../entities/user/api/userApi.ts"

export const useQueryUserInfo = (selectedUserId?: number) => {
  const { data } = useQuery(["get-user-info", selectedUserId], () => getUserInfo(selectedUserId), {
    enabled: !!selectedUserId,
    onError: (error) => console.error("사용자 정보 가져오기 오류:", error),
  })

  return { data }
}
