import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export interface SearchParams {
  sortBy: string
  sortOrder: string
  tag: string
  skip: string
  limit: string
  search: string
}

const useSearchParams = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)

  const [searchParams, setSearchParams] = useState<SearchParams>({
    sortBy: queryParams.get("sortBy") ?? "",
    sortOrder: queryParams.get("sortOrder") ?? "asc",
    tag: queryParams.get("tag") ?? "",
    skip: queryParams.get("skip") ?? "0",
    limit: queryParams.get("limit") ?? "10",
    search: queryParams.get("search") ?? "",
  })

  const updateURL = useCallback(() => {
    const { skip, limit, search, sortBy, sortOrder, tag } = searchParams

    const params = new URLSearchParams()

    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (search) params.set("search", search)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (tag) params.set("tag", tag)

    navigate(`?${params.toString()}`)
  }, [searchParams])

  const changeSeachParams =
    (id: keyof SearchParams) =>
    <T,>(originalValue: T) => {
      const value = typeof originalValue !== "string" ? String(originalValue) : originalValue

      setSearchParams((prev) => ({ ...prev, [id]: value }))
    }

  useEffect(() => {
    updateURL()
  }, [updateURL])

  return { searchParams, setSearchParams, changeSeachParams }
}

export default useSearchParams
