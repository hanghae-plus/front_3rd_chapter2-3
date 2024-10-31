import { atom, useAtom } from "jotai"

const showAddDialogAtom = atom(false)

export const usePostAddModalStore = () => {
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)

  return {
    showAddDialog,
    setShowAddDialog,
  }
}
