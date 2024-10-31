import { atom, useAtom } from "jotai"

// interface
export interface User {
  id: number
  username: string
  image: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: Address
  company: Company
}

interface Address {
  address: string
  city: string
  state: string
}
interface Company {
  name: string
  title: string
}

// Atom
const selectedUserAtom = atom<User | null>(null)
const showUserModalAtom = atom<boolean>(false)

// Hook
export const useUser = () => {
  const [selectedUser, setSelectedUser] = useAtom<User | null>(selectedUserAtom)
  const [showUserModal, setShowUserModal] = useAtom<boolean>(showUserModalAtom)

  return new (class {
    selectedUser = selectedUser
    showUserModal = showUserModal
    setSelectedUser = setSelectedUser
    setShowUserModal = setShowUserModal
  })()
}
