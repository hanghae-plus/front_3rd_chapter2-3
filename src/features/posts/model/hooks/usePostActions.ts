import { Post } from "../../../../entities/post/model/type"
import { openModals } from "../../../../shared/lib/modal/openModals"
import { useDeletePost } from "../../api/query"

export const usePostActions = () => {
  const {
    user,
    post: { openDetailDialog, openEditDialog },
  } = openModals

  const { mutate: deletePost } = useDeletePost()

  const handleOpenPostDetail = (post: Post) => {
    openDetailDialog(post)
  }

  const handleDeletePost = (id: number) => {
    deletePost(id)
  }

  const handleOpenUserModal = (userId: number) => {
    user.openModal(userId)
  }

  const handleOpenEditDialog = (post: Post) => {
    openEditDialog(post)
  }

  return {
    handleOpenPostDetail,
    handleDeletePost,
    handleOpenUserModal,
    handleOpenEditDialog,
  }
}
