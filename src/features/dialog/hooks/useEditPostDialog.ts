import { editPostDialogAtom } from "@features/dialog/model/atom"
import { useAtom } from "jotai"

export const useEditPostDialog = () => {
  const [opened, setDialogs] = useAtom(editPostDialogAtom)

  const openDialog = () => setDialogs(true)

  const closeDialog = () => setDialogs(false)

  return {
    opened,
    openDialog,
    closeDialog,
  }
}
