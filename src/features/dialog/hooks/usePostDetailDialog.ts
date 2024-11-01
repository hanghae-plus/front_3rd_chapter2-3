import { postDetailDialogAtom } from "@features/dialog/model/atom"
import { useAtom } from "jotai"

export const usePostDetailDialog = () => {
  const [opened, setDialogs] = useAtom(postDetailDialogAtom)

  const openDialog = () => setDialogs(true)

  const closeDialog = () => setDialogs(false)

  return {
    opened,
    openDialog,
    closeDialog,
  }
}
