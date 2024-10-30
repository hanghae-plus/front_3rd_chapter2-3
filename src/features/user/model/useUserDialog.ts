import { atom, useAtom } from "jotai"

const showUserDialogAtom = atom(false)

export const useUserDialog = () => {
  const [showUserDialog, setShowUserDialog] = useAtom(showUserDialogAtom)

  return { showUserDialog, setShowUserDialog }
}
