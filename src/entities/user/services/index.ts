import { User } from "@entities/user/types"

export const userCache = (() => {
  const cache = new Map<number, User>()

  /**유저 정보 캐시되어 있는지 조회 */
  const hasUser = (id: number) => cache.has(id)

  /**유저 정보 가져오기 */
  const getUser = (id: number) => {
    if (cache.has(id)) return cache.get(id)
    return null
  }

  /**유저 정보 단일 추가 */
  const updateUser = (user: User) => cache.set(user.id, user)

  /**유저 정보 복수 추가 */
  const setUser = (users: User[]) => {
    users.forEach((user) => cache.set(user.id, user))
  }

  return { users: [...cache.values()], getUser, updateUser, setUser, hasUser }
})()
