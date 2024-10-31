import { UserDetailsView } from "../../../../../entities/user/ui/components/User/UserDetailView"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../shared"
import { useUserQuery } from "../../../lib/hooks/useUserQuery"

interface UserDetailModalProps {
  userId: number | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const UserDetailModal = ({
  userId,
  open,
  onOpenChange,
}: UserDetailModalProps) => {
  const { data: user, isPending } = useUserQuery(userId ?? 0)
  if (isPending) {
    return <div>로딩 중...</div>
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        {isPending ? (
          <div>로딩 중...</div>
        ) : user ? (
          <UserDetailsView user={user} />
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
