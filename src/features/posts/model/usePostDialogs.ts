import { useState } from "react"

interface PostDialogsState {
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
}

interface PostDialogsHandlers {
  handleAddDialog: () => void
  handleEditDialog: () => void
  handlePostDetail: () => void
}

export const usePostDialogs = () => {
  const [dialogs, setDialogs] = useState<PostDialogsState>({
    showAddDialog: false,
    showEditDialog: false,
    showPostDetailDialog: false,
  })

  const handlers: PostDialogsHandlers = {
    handleAddDialog: () => setDialogs((prev) => ({ ...prev, showAddDialog: !prev.showAddDialog })),
    handleEditDialog: () => setDialogs((prev) => ({ ...prev, showEditDialog: !prev.showEditDialog })),
    handlePostDetail: () => setDialogs((prev) => ({ ...prev, showPostDetailDialog: !prev.showPostDetailDialog })),
  }

  return {
    ...dialogs,
    handlers,
  }
}
