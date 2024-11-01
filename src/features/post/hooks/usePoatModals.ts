import { useSelectedPost } from "./useSelectedPost"
import { useSelectedUser } from "@features/user/model"
import { useModal } from "@features/modal/hooks"
import { User } from "@entities/user/model"
import { Post } from "@entities/post/model"
import { useCallback } from "react"

export const usePostModals = () => {
  const { updateSelectedPost } = useSelectedPost()
  const { updateSelectedUser } = useSelectedUser()
  const { openModal } = useModal()

  const openUserModal = useCallback(
    (user: User) => {
      updateSelectedUser(user)
      openModal("detailUser")
    },
    [updateSelectedUser],
  )

  const openEditModal = useCallback(
    (post: Post) => {
      updateSelectedPost(post)
      openModal("editPost")
    },
    [updateSelectedPost],
  )

  const openDetailModal = useCallback(
    (post: Post) => {
      updateSelectedPost(post)
      openModal("detailPost")
    },
    [updateSelectedPost],
  )

  return {
    openUserModal,
    openEditModal,
    openDetailModal,
  }
}