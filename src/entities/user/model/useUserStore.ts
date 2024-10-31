import { create } from "zustand"
import { SelectUserType } from "../../../shared/type"

interface UserState {
  showUserModal: boolean
  selectedUser: SelectUserType | null
  setShowUserModal: (show: boolean) => void
  setSelectedUser: (user: SelectUserType) => void
}

const useUserStore = create<UserState>((set) => ({
  showUserModal: false,
  selectedUser: null,
  setShowUserModal: (show: boolean) => set({ showUserModal: show }),
  setSelectedUser: (user: SelectUserType) => set({ selectedUser: user }),
}))

export default useUserStore
