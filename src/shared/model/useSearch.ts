import { atom, useAtom } from "jotai"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { usePost } from "../../features/post/model/store"

const skipAtom = atom(0)
const limitAtom = atom(10)
const searchQueryAtom = atom("")
const sortByAtom = atom("")
const sortOrderAtom = atom("asc")
const selectedTagAtom = atom("")

export const useSearch = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  // const { getPostsByTag, getPosts } = usePost()

  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  useEffect(() => {
    setSkip(parseInt(queryParams.get("skip") || "0"))
    setLimit(parseInt(queryParams.get("limit") || "10"))
    setSearchQuery(queryParams.get("search") || "")
    setSortBy(queryParams.get("sortBy") || "")
    setSortOrder(queryParams.get("sortOrder") || "asc")
    setSelectedTag(queryParams.get("tag") || "")
  }, [queryParams])

  // useEffect(() => {
  //   if (selectedTag) {
  //     getPostsByTag(selectedTag)
  //   } else {
  //     getPosts(limit, skip)
  //   }
  //   updateURL()
  // }, [])

  return {
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
    updateURL,
  }
}
