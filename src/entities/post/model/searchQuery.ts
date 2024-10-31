import { atom, useAtom } from "jotai"
import useQueryParams from "../../../app/lib/params"

const { searchQuery: initialSearchQuery } = useQueryParams()
const searchQueryAtom = atom<string>(initialSearchQuery)

export const useSearchQuery = () => {
  const [searchQuery, setSearchQuery] = useAtom<string>(searchQueryAtom)

  return new (class {
    searchQuery = searchQuery
  })()
}
