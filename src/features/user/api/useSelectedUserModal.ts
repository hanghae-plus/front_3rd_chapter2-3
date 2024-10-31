import { useState } from "react"

import { UserDetail } from "../../../entities/user/model/types"

const useSelectedUserModal = () => {
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const handleSetSelectedUser = (user: UserDetail) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const handleCloseUserModal = () => {
    setShowUserModal(false)
  }

  return { selectedUser, handleSetSelectedUser, showUserModal, handleCloseUserModal }
}

export default useSelectedUserModal
