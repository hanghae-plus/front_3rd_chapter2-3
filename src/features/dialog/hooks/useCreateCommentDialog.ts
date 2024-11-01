import { createCommentDialogAtom } from "@features/dialog/model/atom"
import { useAtom } from "jotai"

export const useCreateCommentDialog = () => {
  const [opened, setDialogs] = useAtom(createCommentDialogAtom)

  const openDialog = () => setDialogs(true)

  const closeDialog = () => setDialogs(false)

  return {
    opened,
    openDialog,
    closeDialog,
  }
}
