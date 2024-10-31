import { useAtom } from "jotai"
import {
  selectedPostAtom,
  showPostDetailDialogAtom,
  selectedUserAtom,
  showUserModalAtom,
} from "../../../entities/model/post/atoms"
import { fetchUserDetail } from "../../../entities/api/post/post"
import { useComment } from "../../../features/model/comment/useComment"
import type { Post, User } from "../../../shared/types"

export const usePostModal = () => {
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)
  const { handleFetchComments } = useComment()

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    handleFetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  const openUserModal = async (user: User) => {
    try {
      const userData = await fetchUserDetail(user.id)
      if (userData) {
        setSelectedUser(userData)
        setShowUserModal(true)
      }
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return {
    selectedPost,
    setSelectedPost,
    showPostDetailDialog,
    setShowPostDetailDialog,
    selectedUser,
    showUserModal,
    setShowUserModal,
    openPostDetail,
    openUserModal,
  }
}
