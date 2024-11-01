import { getUserById, getAllUsers } from "@entities/user/api"
import { userCache } from "@entities/user/lib"
import { useEffect } from "react"

export const useUserCache = () => {
  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const data = await getAllUsers()
    if (!data) return

    if (data) userCache.setUser(data)
  }

  const getUser = async (id: number) => {
    const cacheUser = userCache.getUser(id)
    if (cacheUser) return cacheUser

    const data = await getUserById(id)
    if (!data) return null

    if (data) userCache.updateUser(data)
    return data
  }

  return { userData: [...userCache.users.values()], fetchUsers, getUser }
} 