import { useState } from "react"

interface CommentDialogsState {
  showAddDialog: boolean
  showEditDialog: boolean
}

interface CommentDialogsHandlers {
  handleAddDialog: () => void
  handleEditDialog: () => void
}

export const useCommentDialogs = () => {
  const [dialogs, setDialogs] = useState<CommentDialogsState>({
    showAddDialog: false,
    showEditDialog: false,
  })

  const handlers: CommentDialogsHandlers = {
    handleAddDialog: () => setDialogs((prev) => ({ ...prev, showAddDialog: !prev.showAddDialog })),
    handleEditDialog: () => setDialogs((prev) => ({ ...prev, showEditDialog: !prev.showEditDialog })),
  }

  return { ...dialogs, handlers }
}
