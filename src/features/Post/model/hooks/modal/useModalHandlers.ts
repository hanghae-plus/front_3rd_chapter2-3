import { Post } from "../../../../../entities/Post/model/types"
import { usePostManagerStore } from "../../../../../pages/model/stores/usePostManagerStore"
import { useCommentService } from "../../../../Comment/model/services/useCommentService"
import { usePostStore } from "../../stores/usePostStore"

export const useModalHandlers = () => {
  const { setSelectedPost } = usePostStore()
  const { setShowPostDetailDialog, setShowUserDialog, setSelectedUser } = usePostManagerStore()
  const { fetchComments } = useCommentService()

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  const openUserModal = async (user: { id: number; username: string; image: string } | undefined) => {
    if (!user) return
    try {
      const response = await fetch(`/api/users/${user.id}`)
      const userData = await response.json()
      setSelectedUser(userData)
      setShowUserDialog(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return { openPostDetail, openUserModal }
}