import { atom, useAtom } from "jotai"

const queryParams = new URLSearchParams(window.location.search)

const totalAtom = atom<number>(0)
const skipAtom = atom<number>(parseInt(queryParams.get("skip") || "0"))
const limitAtom = atom<number>(parseInt(queryParams.get("limit") || "10"))
const searchQueryAtom = atom<string>(queryParams.get("search") || "")
const sortByAtom = atom<string>(queryParams.get("sortBy") || "")
const sortOrderAtom = atom<string>(queryParams.get("sortOrder") || "asc")
const selectedTagAtom = atom<string>(queryParams.get("tag") || "")

export const useParam = () => {
  const [total, setTotal] = useAtom(totalAtom)
  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  return {
    total,
    setTotal,
    skip,
    setSkip,
    limit,
    setLimit,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    selectedTag,
    setSelectedTag,
  }
}
