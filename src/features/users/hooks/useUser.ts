import { useAtom } from "jotai"
import { selectedUserAtom, showUserModalAtom } from "../model/userAtoms"

const useUser = () => {
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  return {
    showUserModal,
    setShowUserModal,
    selectedUser,
    setSelectedUser,
  }
}

export default useUser
