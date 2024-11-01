import { atom, useAtom } from "jotai"

const modalStateAtom = atom<{ [key: string]: boolean }>({
  createPost: false,
  editPost: false,
  detailPost: false,
  detailUser: false,
  createComment: false,
  editComment: false,
})

export const useModal = () => {
  const [modals, setModals] = useAtom(modalStateAtom)

  const openModal = (key: string) => {
    setModals((prev) => ({ ...prev, [key]: true }))
  }

  const closeModal = (key: string) => {
    setModals((prev) => ({ ...prev, [key]: false }))
  }

  return {
    openCreatePost: modals.createPost,
    openEditPost: modals.editPost,
    openDetailPost: modals.detailPost,
    openDetailUser: modals.detailUser,
    openCreateComment: modals.createComment,
    openEditComment: modals.editComment,
    openModal,
    closeModal,
  }
}