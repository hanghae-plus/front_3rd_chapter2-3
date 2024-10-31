import { PostListParams } from "../model/type"

export const createSearchParams = (params: PostListParams) => {
  const searchParams = new URLSearchParams()

  params.skip && searchParams.set("skip", params.skip.toString())
  params.limit && searchParams.set("limit", params.limit.toString())
  params.searchQuery && searchParams.set("search", params.searchQuery)
  params.sortKey && searchParams.set("sortKey", params.sortKey)
  params.sortOrder && searchParams.set("sortOrder", params.sortOrder)
  params.selectedTag && searchParams.set("tag", params.selectedTag)

  return searchParams
}
