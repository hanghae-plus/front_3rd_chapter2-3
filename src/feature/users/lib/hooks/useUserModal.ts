import { useUserQuery } from './useUserQuery'
import { useUserModalStore } from '../../model/store/userModalStore'

export const useUserModal = () => {
  const { isOpen, userId, setOpen, setUserId } = useUserModalStore()
  const { data: userData } = useUserQuery(userId)

  const openModal = (id: number) => {
    setUserId(id)
    setOpen(true)
  }

  const onOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      setUserId(null)
    }
  }

  return {
    isOpen,
    userId,
    userData,
    openModal,
    onOpenChange,
  }
}