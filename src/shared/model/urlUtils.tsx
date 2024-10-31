// src/utils/urlUtils.ts
import { useNavigate } from "react-router-dom"
import { useAtom } from "jotai"
import {
  skipAtom,
  limitAtom,
  searchQueryAtom,
  sortByAtom,
  sortOrderAtom,
  selectedTagAtom,
} from "../../feature/post/model/postAtoms"

export const useUpdateURL = () => {
  const navigate = useNavigate()

  // Jotai 상태 가져오기
  const [skip] = useAtom(skipAtom)
  const [limit] = useAtom(limitAtom)
  const [searchQuery] = useAtom(searchQueryAtom)
  const [sortBy] = useAtom(sortByAtom)
  const [sortOrder] = useAtom(sortOrderAtom)
  const [selectedTag] = useAtom(selectedTagAtom)

  const updateURL = () => {
    const params = new URLSearchParams()

    const queryParams: Record<string, string | undefined> = {
      skip: skip ? skip.toString() : undefined,
      limit: limit ? limit.toString() : undefined,
      search: searchQuery,
      sortBy,
      sortOrder,
      tag: selectedTag,
    }

    Object.entries(queryParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })

    navigate(`?${params.toString()}`)
  }

  return updateURL
}
