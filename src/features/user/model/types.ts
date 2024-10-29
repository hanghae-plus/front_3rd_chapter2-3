import { UserData } from "../../../entities/user/model/types"

export type UserInfoModalProps = {
  showUserModal: boolean
  setShowUserModal: (show: boolean) => void
  selectedUser: UserData | null
}
