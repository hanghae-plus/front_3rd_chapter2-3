import { SearchParams } from "@features/searchParams/types"
import { NavigateFunction } from "react-router-dom"

export const updateURL = (
  navigate: NavigateFunction,
  searchParams: Partial<SearchParams>,
) => {
  const { skip, limit, q, sortBy, sortOrder, selectedTag } = searchParams

  const params = new URLSearchParams(window.location.search)
  if (skip) params.set("skip", skip.toString())
  if (limit) params.set("limit", limit.toString())
  if (q) params.set("search", q)
  if (sortBy) params.set("sortBy", sortBy)
  if (sortOrder) params.set("sortOrder", sortOrder)
  if (selectedTag) params.set("tag", selectedTag)

  navigate(`?${params.toString()}`)
}

/**
 * search와 tag 검색을 한번에 못한다. https://dummyjson.com
 * 검색 시에 search , tag 중 우선도 파악 필요
 * ex: (search가 중요하면 tag초기화하고 검색) / tag가 중요하면 search 초기화하고 tag 검색
 * TODO api를 만들거나 / 검색 구조 변경 필요
 */
export const convertSearchParamsToString = ({
  skip,
  limit,
  q,
  sortBy,
  sortOrder,
  selectedTag,
}: SearchParams) => {
  const params = new URLSearchParams()
  if (skip) params.set("skip", skip.toString())
  if (limit) params.set("limit", limit.toString())
  if (q) params.set("search", q)
  if (sortBy) params.set("sortBy", sortBy)
  if (sortOrder) params.set("sortOrder", sortOrder)

  // 조건부 URL 생성
  const hasTag = selectedTag && selectedTag !== "all"
  const hasSearch = q && q !== ""

  if (hasSearch) return `/search?q=${q}&${params.toString()}`
  if (hasTag) return `/tag/${selectedTag}?${params.toString()}`
  return `?${params.toString()}`
}

export const getSearchParamsToURL = (key: string) => {
  const params = new URLSearchParams(window.location.search)

  if (key === "limit" || key === "skip") return params.get(key) || ""
  if (key === "sortOrder") return params.get(key) || "asc"

  return params.get(key) || ""
}
