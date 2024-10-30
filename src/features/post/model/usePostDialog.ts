import { Post } from "../../../entities/post/model/types.ts"
import { atom, useAtom } from "jotai"

const selectedPostAtom = atom<Post | null>(null)
const showAddDialogAtom = atom(false)
const showEditDialogAtom = atom(false)
const showPostDetailDialogAtom = atom(false)

export const usePostDialog = () => {
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showAddDialogAtom)
  const [showAddDialog, setShowAddDialog] = useAtom(showEditDialogAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)

  return {
    selectedPost,
    setSelectedPost,
    showEditDialog,
    setShowEditDialog,
    showAddDialog,
    setShowAddDialog,
    showPostDetailDialog,
    setShowPostDetailDialog,
  }
}
