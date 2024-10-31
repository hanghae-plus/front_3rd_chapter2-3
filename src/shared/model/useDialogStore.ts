import { create } from "zustand"

export const Dialog_e = {
  PostAdd: "PostAdd",
  PostEdit: "PostEdit",
  PostDetails: "PostDetails",
  CommentAdd: "CommentAdd",
  CommentEdit: "CommentEdit",
  User: "User",
} as const
export type Dialog_e = (typeof Dialog_e)[keyof typeof Dialog_e]

interface DialogState_i {
  currentDialog: Dialog_e | null
  dialogProps: Record<string, unknown>
  onOpenChange: (open: boolean) => void
  openDialog: (dialog: Dialog_e, props?: Record<string, unknown>) => void
  closeDialog: () => void
  isDialogOpen: (dialog: Dialog_e) => boolean
}

export const useDialogStore = create<DialogState_i>((set, get) => ({
  currentDialog: null,
  dialogProps: {},
  onOpenChange: (open) => {
    if (open) {
      get().openDialog(Dialog_e.PostAdd)
    } else {
      get().closeDialog()
    }
  },

  openDialog: (dialog: Dialog_e, props = {}) => {
    console.log("dialog", dialog)
    set({
      currentDialog: dialog,
      dialogProps: props,
    })
  },

  closeDialog: () => {
    set({
      currentDialog: null,
      dialogProps: {},
    })
  },

  isDialogOpen: (dialog: Dialog_e) => {
    return get().currentDialog === dialog
  },
}))
