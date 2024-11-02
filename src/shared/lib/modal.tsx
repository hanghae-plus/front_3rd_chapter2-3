import { useCallback, useState } from "react"

type ModalState<T extends string> = { [key in T]: boolean }

export const useModal = <T extends string>(defaultState: ModalState<T>) => {
  const [modals, setModals] = useState<ModalState<T>>(defaultState)

  const openModal = useCallback((id: T) => {
    setModals((prev) => ({ ...prev, [id]: true }))
  }, [])

  const closeModal = useCallback((id: T) => {
    setModals((prev) => ({ ...prev, [id]: false }))
  }, [])

  const toggleModal = useCallback((id: T) => {
    setModals((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const manageModal = useCallback(
    (id: T) => (open: boolean) => {
      setModals((prev) => ({ ...prev, [id]: open }))
    },
    [],
  )

  const isOpen = useCallback((id: T) => !!modals[id], [modals])

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    manageModal,
  }
}
