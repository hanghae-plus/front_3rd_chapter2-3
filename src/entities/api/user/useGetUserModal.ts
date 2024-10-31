import { useAtom } from "jotai"
import { selectedUserAtom, showUserModalAtom, userIdAtom } from "../../../app/atom" // userIdAtom을 추가
import { useQuery } from "@tanstack/react-query"

export const useGetUserModal = () => {
  const [, setSelectedUser] = useAtom(selectedUserAtom)
  const [, setShowUserModal] = useAtom(showUserModalAtom)
  const [userId] = useAtom(userIdAtom) // 사용자 ID를 atom에서 가져옵니다.

  return useQuery({
    queryKey: ["getUserModal", userId], // userId를 쿼리 키에 추가
    queryFn: async () => {
      if (!userId) throw new Error("사용자 ID가 없습니다.") // ID가 없으면 오류 발생
      const response = await fetch(`/api/users/${userId}`)
      if (!response.ok) throw new Error("사용자 정보 가져오기 오류")
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
      return userData // 사용자 데이터 반환
    },
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
  })
}
