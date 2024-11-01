import { userDetailDialogAtom } from "@features/dialog/model/atom"
import { useAtom } from "jotai"

export const useUserDetailDialog = () => {
  const [opened, setDialogs] = useAtom(userDetailDialogAtom)

  const openDialog = () => setDialogs(true)

  const closeDialog = () => setDialogs(false)

  return {
    opened,
    openDialog,
    closeDialog,
  }
}
