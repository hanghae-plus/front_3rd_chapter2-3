import { Users } from "../model/User"

const fetchUserInfo = async () => {
  const response = await fetch("/api/users?limit=0&select=username,image")
  return await response.json()
}

const fetchUserModalInfo = async (user: Users) => {
  const response = await fetch(`/api/users/${user.id}`)
  return await response.json()
}

export { fetchUserInfo, fetchUserModalInfo }
