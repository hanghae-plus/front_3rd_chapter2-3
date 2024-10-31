import { atom, useAtom } from "jotai"

const showUserModalAtom = atom(false)

export const useUserDialog = () => {
  const [showUserModal, setShowUserModal] = useAtom(showUserModalAtom)

  return new (class {
    showUserModal = showUserModal
    setShowUserModal = setShowUserModal
  })()
}
