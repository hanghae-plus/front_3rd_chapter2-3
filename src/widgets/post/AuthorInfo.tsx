import { User } from "../../shared/type"
import { useUser } from "../../features/user/model/useUser"

export function AuthorInfo({ author }: { author: User }) {
  const { setSelectedUser, setShowUserModal } = useUser()
  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(author)}>
      <img src={author?.image} alt={author?.username} className="w-8 h-8 rounded-full" />
      <span>{author?.username}</span>
    </div>
  )
}
