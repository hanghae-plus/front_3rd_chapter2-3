import { atom, useAtom } from "jotai"

const showAddCommentDialogAtom = atom(false)
const showEditCommentDialogAtom = atom(false)

export const useCommentDialog = () => {
  const [showAddCommentDialog, setShowAddCommentDialog] = useAtom(showAddCommentDialogAtom)

  const [showEditCommentDialog, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom)

  return { showAddCommentDialog, setShowAddCommentDialog, showEditCommentDialog, setShowEditCommentDialog }
}
