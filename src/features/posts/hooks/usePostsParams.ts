import { useAtom } from "jotai"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { limitAtom, searchQueryAtom, skipAtom, sortByAtom, sortOrderAtom } from "../../../shared/model/atom"

export const usePostsParams = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)

  const updateURL = (params: Record<string, string>) => {
    const urlParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value) urlParams.set(key, value)
    })
    navigate(`?${urlParams.toString()}`)
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder((params.get("sortOrder") as "asc" | "desc") || "asc")
  }, [location.search])

  return {
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    updateURL,
  }
}
