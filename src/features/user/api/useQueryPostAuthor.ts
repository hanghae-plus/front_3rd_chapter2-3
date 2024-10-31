import { getUserById } from "@entities/user/api"
import { userCache } from "@entities/user/lib"
import { useQuery } from "@tanstack/react-query"
import { User } from "@entities/user/model"
import { authorValue } from "../config/authorValue"

export const useQueryPostAuthor = (userId: number) => {
  const { data: author } = useQuery<User>({
    queryKey: ["author", userId],
    queryFn: async () => {
      if (userCache.hasUser(userId)) {
        return userCache.getUser(userId) as User
      } else {
        const userData = await getUserById(userId)
        userCache.updateUser(userData)
        return userData
      }
    },
    initialData: authorValue.initial,
  })

  return { author }
}