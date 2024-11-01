import { editCommentDialogAtom } from "@features/dialog/model/atom"
import { useAtom } from "jotai"

export const useEditCommentDialog = () => {
  const [opened, setDialogs] = useAtom(editCommentDialogAtom)

  const openDialog = () => setDialogs(true)

  const closeDialog = () => setDialogs(false)

  return {
    opened,
    openDialog,
    closeDialog,
  }
}
