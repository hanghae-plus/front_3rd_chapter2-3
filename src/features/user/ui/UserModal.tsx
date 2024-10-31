import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { useQueryUser } from "../api/useQueryUser"
import { useUserStore } from "../model/userStore"

export const UserModal = () => {
  const { selectedUser, showUserModal, setShowUserModal } = useUserStore()
  const { data: userInfo } = useQueryUser(selectedUser?.id || -1)

  return (
    <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <img src={userInfo?.image} alt={userInfo?.username} className="w-24 h-24 rounded-full mx-auto" />
          <h3 className="text-xl font-semibold text-center">{userInfo?.username}</h3>
          <div className="space-y-2">
            <p>
              <strong>이름:</strong> {userInfo?.firstName} {userInfo?.lastName}
            </p>
            <p>
              <strong>나이:</strong> {userInfo?.age}
            </p>
            <p>
              <strong>이메일:</strong> {userInfo?.email}
            </p>
            <p>
              <strong>전화번호:</strong> {userInfo?.phone}
            </p>
            <p>
              <strong>주소:</strong> {userInfo?.address?.address}, {userInfo?.address?.city}, {userInfo?.address?.state}
            </p>
            <p>
              <strong>직장:</strong> {userInfo?.company?.name} - {userInfo?.company?.title}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
