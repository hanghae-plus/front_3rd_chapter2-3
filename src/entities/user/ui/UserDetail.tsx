import { useUserDetailDialog } from "@features/dialog/hooks/useUserDetailDialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@shared/ui"
import { selectedUserAtom } from "@entities/user/model/atom"
import { useAtomValue } from "jotai"

export const UserDetail: React.FC = () => {
  const selectedUser = useAtomValue(selectedUserAtom)
  const { opened, closeDialog } = useUserDetailDialog()

  return (
    <Dialog open={opened} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img
            src={selectedUser?.image}
            alt={selectedUser?.username}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-xl font-semibold text-center">
            {selectedUser?.username}
          </h3>
          <div className="space-y-2">
            <p>
              <strong>이름:</strong> {selectedUser?.firstName}{" "}
              {selectedUser?.lastName}
            </p>
            <p>
              <strong>나이:</strong> {selectedUser?.age}
            </p>
            <p>
              <strong>이메일:</strong> {selectedUser?.email}
            </p>
            <p>
              <strong>전화번호:</strong> {selectedUser?.phone}
            </p>
            <p>
              <strong>주소:</strong> {selectedUser?.address?.address},{" "}
              {selectedUser?.address?.city}, {selectedUser?.address?.state}
            </p>
            <p>
              <strong>직장:</strong> {selectedUser?.company?.name} -{" "}
              {selectedUser?.company?.title}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
