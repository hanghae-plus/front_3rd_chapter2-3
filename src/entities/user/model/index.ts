import { useState } from "react"
import { User } from "./types"
import { fetchUsersApi } from "../api"

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  const getUsers = () => {
    fetchUsersApi().then((data) => {
      setUsers(data.users)
    })
  }

  return { users, getUsers }
}
