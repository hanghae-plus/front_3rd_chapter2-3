import { useAtom } from "jotai"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/dialog/Dialog"
import { User } from "./User"
import { showUserModalAtom } from "../../feature/post/model/postAtoms"

export const UserDialog = () => {
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)

  return (
    <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <User showUserModal={showUserModal} />
      </DialogContent>
    </Dialog>
  )
}
