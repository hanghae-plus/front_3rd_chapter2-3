import { fetchUserApi } from "@entities/user/api/fetchUserApi"
import { DEFAULT_USER_DATA } from "@entities/user/constants"
import { userCache } from "@entities/user/services"
import { useQuery } from "@tanstack/react-query"
import { User } from "@entities/user/types"

export const useAuthor = (userId: number) => {
  const { data: author } = useQuery<User>({
    queryKey: ["author", userId],
    queryFn: async () => {
      if (userCache.hasUser(userId)) {
        return userCache.getUser(userId) as User
      } else {
        const userData = await fetchUserApi(userId)
        userCache.updateUser(userData)
        return userData
      }
    },
    initialData: DEFAULT_USER_DATA,
  })

  return { author }
}
