import { atom, useAtom } from "jotai"

type ActiveQuery = "all" | "search" | "tag"

const activeQueryAtom = atom<ActiveQuery>("all")

export const usePostQueryStore = () => {
  const [activeQuery, setActiveQuery] = useAtom(activeQueryAtom)

  return { activeQuery, setActiveQuery }
}
