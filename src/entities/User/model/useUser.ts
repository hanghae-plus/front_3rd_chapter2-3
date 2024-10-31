import { useQueryClient } from "@tanstack/react-query"
import { useQueryUser } from "../api/useQueryUser"
import { UsersQueryProps, UserType } from "./types"
import { userApi } from "../api"
import { useUserDialog } from "./useUserDialog"
import { atom, useAtom } from "jotai"

const selectedUserAtom = atom<UserType>()

export const useUser = ({ limit = 0, select = "username,image" }: UsersQueryProps) => {
  const queryClient = useQueryClient()
  const { data, isLoading, error, isError } = useQueryUser({ limit, select })
  const { setShowUserDialog } = useUserDialog()
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom)

  const { fetchUser } = userApi

  const openUserDialog = async (userId: number) => {
    const userData = await queryClient.fetchQuery({
      queryKey: ["user", { id: userId }],
      queryFn: () => fetchUser(userId),
    })
    setSelectedUser(userData.data)
    setShowUserDialog(true)
  }
  return {
    userList: data?.users ?? [],
    isLoading,
    isError,
    error,
    openUserDialog,
    selectedUser,
    setSelectedUser,
  }
}
