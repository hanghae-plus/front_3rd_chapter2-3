import { useState } from "react"
import { SelectedUser } from "../model/User"

const useUserState = () => {
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null)
  return {
    showUserModal,
    setShowUserModal,
    selectedUser,
    setSelectedUser,
  }
}

export default useUserState
