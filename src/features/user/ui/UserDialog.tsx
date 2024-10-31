import { useDialogStore } from "../../../shared/model/useDialogStore"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { useUserQuery } from "../api/useUserQuery"
import { User_i } from "../../../entities/user/model/types"

type UserDialogProps_t = {
  user?: User_i
}

export const UserDialog = ({ user }: UserDialogProps_t) => {
  const dialogStore = useDialogStore()

  const { data: selectedUser } = useUserQuery(user!)

  if (!selectedUser) return null

  return (
    <Dialog open={true} onOpenChange={dialogStore.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img src={selectedUser.image} alt={selectedUser.username} className="w-24 h-24 rounded-full mx-auto" />
          <h3 className="text-xl font-semibold text-center">{selectedUser.username}</h3>
          <div className="space-y-2">
            <p>
              <strong>이름:</strong> {selectedUser.firstName} {selectedUser.lastName}
            </p>
            <p>
              <strong>나이:</strong> {selectedUser.age}
            </p>
            <p>
              <strong>이메일:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>전화번호:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>주소:</strong> {selectedUser.address.address}, {selectedUser.address.city},{" "}
              {selectedUser.address?.state}
            </p>
            <p>
              <strong>직장:</strong> {selectedUser.company.name} - {selectedUser.company.title}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
