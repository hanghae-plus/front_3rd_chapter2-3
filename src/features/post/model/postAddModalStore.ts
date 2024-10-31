import { atom, useAtom } from "jotai"

const showAddDialogAtom = atom(false)

export const usePostAddModalStore = () => {
  const [showPostAddModal, setShowPostAddModal] = useAtom(showAddDialogAtom)

  return {
    showPostAddModal,
    setShowPostAddModal,
  }
}
