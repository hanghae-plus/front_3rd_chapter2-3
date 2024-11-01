import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui/dialog"
import { useSelectedUser } from "@features/user/model"
import { useModal } from "@features/modal/hooks"
import { UserInfoText } from "@entities/user/ui/UserInfoText"

export const UserDetailModal = () => {
  const { selectedUser } = useSelectedUser()
  const { openDetailUser, closeModal } = useModal()

  return (
    <Dialog
      open={openDetailUser}
      onOpenChange={() => closeModal("detailUser")}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <UserInfoText {...selectedUser} />
      </DialogContent>
    </Dialog>
  )
} 