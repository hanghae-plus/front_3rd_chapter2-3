import { Users } from "../model/User"

const fetchUserModalInfo = async (user: Users) => {
  const response = await fetch(`/api/users/${user.id}`)
  return await response.json()
}

export { fetchUserModalInfo }
