import { useUserQuery } from '../../../../entities';
import useDialogStore from '../../../../shared/lib/dialog/model/useDialogStore';
import { Dialog } from '../../../../shared/ui/organisms/Dialog/ui/Dialog';
import {
  DialogContent,
} from '../../../../shared/ui/organisms/Dialog/ui/DialogContent';
import {
  DialogHeader,
} from '../../../../shared/ui/organisms/Dialog/ui/DialogHeader';
import {
  DialogTitle,
} from '../../../../shared/ui/organisms/Dialog/ui/DialogTitle';
import InfoItem from '../Info/UserInfoItem';

interface UserDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const UserDetailDialog = ({ open, onOpenChange }: UserDetailDialogProps) => {
  const dialogProps = useDialogStore((state) => state?.dialogs.userInfo.props) as { userId?: number }
  const { userId } = dialogProps

  const { data: user } = useUserQuery(userId!)

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <img src={user?.image} alt={user?.username} className="w-24 h-24 rounded-full object-cover" />
            <h3 className="text-xl font-semibold mt-2">{user?.username}</h3>
          </div>

          <div className="space-y-2">
            <InfoItem label="이름" value={`${user?.firstName} ${user?.lastName}`} />
            <InfoItem label="나이" value={user?.age?.toString()} />
            <InfoItem label="이메일" value={user?.email} />
            <InfoItem label="전화번호" value={user?.phone} />
            <InfoItem label="주소" value={`${user?.address.address}, ${user?.address.city}, ${user.address.state}`} />
            <InfoItem label="직장" value={`${user?.company.name} - ${user?.company.title}`} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserDetailDialog
