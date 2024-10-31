import { atom, useAtom } from "jotai"

const showPostEditModalAtom = atom(false)

export const usePostEditModalStore = () => {
  const [showPostEditModal, setShowPostEditModal] = useAtom(showPostEditModalAtom)

  return {
    showPostEditModal,
    setShowPostEditModal,
  }
}
