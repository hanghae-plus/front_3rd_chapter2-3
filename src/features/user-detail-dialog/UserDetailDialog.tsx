import { showUserDetailDialogAtom } from "@/features/atom"
import { default as UserDetailDialogUI } from "./ui/UserDetailDialog"
import { useAtom } from "jotai"
import { userAtom } from "@/entities/user"

const UserDetailDialog = () => {
  const [open, setOpen] = useAtom(showUserDetailDialogAtom)
  const [user] = useAtom(userAtom)

  return <UserDetailDialogUI open={open} onOpenChange={setOpen} selectedUser={user} />
}

export default UserDetailDialog
