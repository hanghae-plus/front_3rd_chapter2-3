import { atom, useAtom } from "jotai"

const showAddDialogAtom = atom(false)
const showEditDialogAtom = atom(false)
const showPostDetailDialogAtom = atom(false)

export const usePostDialog = () => {
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)

  const handleAddDialog = () => {
    setShowAddDialog((prev) => !prev)
  }

  const handleEditDialog = () => {
    setShowEditDialog((prev) => !prev)
  }

  const handlePostDetailDialog = () => {
    setShowPostDetailDialog((prev) => !prev)
  }

  return {
    showAddDialog,
    setShowAddDialog,
    showEditDialog,
    setShowEditDialog,
    showPostDetailDialog,
    setShowPostDetailDialog,
    handleAddDialog,
    handleEditDialog,
    handlePostDetailDialog,
  }
}
