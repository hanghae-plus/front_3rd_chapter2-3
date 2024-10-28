import { createContext, PropsWithChildren, useContext, useMemo } from "react"
import { User, UserInfo } from "./types"
import { useUser } from "../../../features/user/model/useUser"

interface UserContextType {
  showUserModal: boolean
  setShowUserModal: (show: boolean) => void
  selectedUser: UserInfo | null
  openUserModal: (user: User) => void
}

const UserContext = createContext<UserContextType | null>(null)

export const UserContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const userHookValues = useUser()
  const value = useMemo(() => ({ ...userHookValues }), [userHookValues])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error("usePostContext must be used within a PostContextProvider")
  }

  return context
}
