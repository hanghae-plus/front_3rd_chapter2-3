import { useAtom } from "jotai"
import { Post, User } from "../app/type"
import { selectedPostAtom, selectedUserAtom, showPostDetailDialogAtom, showUserModalAtom } from "../app/atom"
import useCommentManagement from "./useCommentManagement"

const usePostDetail = () => {
  const [, setSelectedPost] = useAtom(selectedPostAtom)
  const { fetchComments } = useCommentManagement()
  const [, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  return { openPostDetail }
}

const useUserModal = () => {
  const [, setSelectedUser] = useAtom(selectedUserAtom)
  const [, setShowUserModal] = useAtom(showUserModalAtom)
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

  return { openUserModal }
}

export { usePostDetail, useUserModal }
