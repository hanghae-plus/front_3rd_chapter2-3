import { User } from "@entities/user/model"

export const userCache = (() => {
  const cache = new Map<number, User>()

  const hasUser = (id: number) => 
    cache.has(id)

  const getUser = (id: number) => 
    cache.has(id) 
      ? cache.get(id) 
      : null

  const updateUser = (user: User) => 
    cache.set(user.id, user)

  const setUser = (users: User[]) => 
    users.forEach(user => 
      cache.set(user.id, user)
    )

  return { 
    users: [...cache.values()], 
    hasUser,
    getUser, 
    updateUser, 
    setUser,
  }
})()