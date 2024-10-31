import { atom, useAtom } from "jotai"

const selectedUserIdAtom = atom<number | null>(null)

export const useUser = () => {
  const [selectedUserId, setSelectedUserId] = useAtom(selectedUserIdAtom)

  return new (class {
    selectedUserId = selectedUserId
    setSelectedUserId = setSelectedUserId
  })()
}
