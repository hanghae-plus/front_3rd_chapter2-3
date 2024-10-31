import { User } from '../model/type'

export const UserApi = {
  fetchUsers: async () => {
    const response = await fetch("/api/users?limit=0&select=username,image")
    if (!response.ok) throw new Error('Failed to fetch users')
    return response.json()
  },

  fetchUserById: async (id: number) => {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) throw new Error('Failed to fetch user')
    return response.json()
  },

  updateUser: async (user: User) => {
    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    if (!response.ok) throw new Error('Failed to update user')
    return response.json()
  }
}