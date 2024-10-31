import { atom, useAtom } from "jotai"

const totalAtom = atom(0)

export const usePostTotalStore = () => {
  const [total, setTotal] = useAtom(totalAtom)

  return { total, setTotal }
}
