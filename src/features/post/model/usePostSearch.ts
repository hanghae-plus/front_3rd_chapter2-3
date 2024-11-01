import { atom, useAtom } from "jotai"

const searchTextAtom = atom("")

export const usePostSearch = () => {
  const [searchText, setSearchText] = useAtom(searchTextAtom)

  return {
    searchText,
    setSearchText,
  }
}
