import { useState } from "react"
import { Dialog } from "../../../shared/ui" // Adjust the path as necessary

import UserModalDiallogContent from "../../../entities/users/ui/UserModalDialogContent"
import { SelectedUser } from "../../../entities/users/model/User"

interface UserModalDialog {
  selectedUser?: SelectedUser
}

const UserDialog = ({ selectedUser }: UserModalDialog) => {
  const [showUserModal, setShowUserModal] = useState(false)

  return (
    <>
      <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
        {selectedUser && <UserModalDiallogContent selectedUser={selectedUser} />}
      </Dialog>
    </>
  )
}

export default UserDialog
