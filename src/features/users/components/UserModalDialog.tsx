import { useEffect, useState } from "react"

import UserModalDiallogContent from "../../../entities/users/ui/UserModalDialogContent"
import useUser from "../hooks/useUser"
import { Dialog } from "../../../shared/ui"

const UserModalDialog = () => {
  const [showUserModal, setShowUserModal] = useState(false)
  const { selectedUser } = useUser()

  useEffect(() => {
    if (selectedUser?.id) {
      setShowUserModal(true)
    }
  }, [selectedUser])

  return (
    <>
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        {selectedUser && <UserModalDiallogContent selectedUser={selectedUser} />}
      </Dialog>
    </>
  )
}

export default UserModalDialog
