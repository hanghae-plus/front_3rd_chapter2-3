import { PostAddDialog } from "../../features/post/ui/PostAddDialog"
import { Dialog_e, useDialogStore } from "../../shared/model/useDialogStore"
import { CommentAddDialog } from "../../features/comment/ui/CommentAddDialog"
import { UserDialog } from "../../features/user/ui/UserDialog"
import { PostDetailsDialog } from "../../features/post/ui/PostDetailsDialog"
import { PostEditDialog } from "../../features/post/ui/PostEditDialog"
import { CommentEditDialog } from "../../features/comment/ui/CommentEditDialog"

const DIALOG_COMPONENTS = {
  [Dialog_e.PostAdd]: PostAddDialog,
  [Dialog_e.PostEdit]: PostEditDialog,
  [Dialog_e.PostDetails]: PostDetailsDialog,
  [Dialog_e.CommentAdd]: CommentAddDialog,
  [Dialog_e.CommentEdit]: CommentEditDialog,
  [Dialog_e.User]: UserDialog,
} as const

export const DialogContainer = () => {
  const [currentDialog, dialogProps] = useDialogStore((state) => [state.currentDialog, state.dialogProps])

  console.log("currentDialog", currentDialog)

  if (!currentDialog) return null

  const DialogComponent = DIALOG_COMPONENTS[currentDialog]

  console.log("DialogComponent", DialogComponent)

  return <DialogComponent {...dialogProps} />
}
