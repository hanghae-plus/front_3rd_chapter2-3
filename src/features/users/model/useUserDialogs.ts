import { useState } from "react"

interface UserDialogsState {
  showDetailDialog: boolean
}

interface UserDialogsHandlers {
  handleDetailDialog: () => void
}

export const useUserDialogs = () => {
  const [dialogs, setDialogs] = useState<UserDialogsState>({
    showDetailDialog: false,
  })

  const handlers: UserDialogsHandlers = {
    handleDetailDialog: () => setDialogs((prev) => ({ ...prev, showDetailDialog: !prev.showDetailDialog })),
  }

  return { ...dialogs, handlers }
}
