import { atom, useAtom } from "jotai"

const showPostAddDialogAtom = atom(false)
const showPostUpdateDialogAtom = atom(false)
const showCommentAddDialogAtom = atom(false)
const showCommentUpdateDialogAtom = atom(false)
const showPostDetailDialogAtom = atom(false)
const showUserDetailDialogAtom = atom(false)

export const useDialog = () => {

  const [showPostAddDialog, setShowPostAddDialog] = useAtom(showPostAddDialogAtom)
  const [showPostUpdateDialog, setShowPostUpdateDialog] = useAtom(showPostUpdateDialogAtom)
  const [showCommentAddDialog, setShowCommentAddDialog] = useAtom(showCommentAddDialogAtom)
  const [showCommentUpdateDialog, setShowCommentUpdateDialog] = useAtom(showCommentUpdateDialogAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [showUserDetailDialog, setShowUserDetailDialog] = useAtom(showUserDetailDialogAtom)

  return {
    showPostAddDialog,
    setShowPostAddDialog,
    showPostUpdateDialog,
    setShowPostUpdateDialog,
    showCommentAddDialog,
    setShowCommentAddDialog,
    showCommentUpdateDialog,
    setShowCommentUpdateDialog,
    showPostDetailDialog,
    setShowPostDetailDialog,
    showUserDetailDialog,
    setShowUserDetailDialog
  }
}