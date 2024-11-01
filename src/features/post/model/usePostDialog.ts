import { atom, useAtom } from "jotai"

const showAddDialogAtom = atom<boolean>(false)
const showEditDialogAtom = atom<boolean>(false)
const showPostDetailDialogAtom = atom<boolean>(false)

export const usePostDialog = () => {
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)

  return {
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    showPostDetailDialog,
    setShowPostDetailDialog,
  }
}
