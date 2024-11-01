import { createPostDialogAtom } from "@features/dialog/model/atom"
import { useAtom } from "jotai"

export const useCreatePostDialog = () => {
  const [opened, setDialogs] = useAtom(createPostDialogAtom)

  const openDialog = () => setDialogs(true)

  const closeDialog = () => setDialogs(false)

  return {
    opened,
    openDialog,
    closeDialog,
  }
}
