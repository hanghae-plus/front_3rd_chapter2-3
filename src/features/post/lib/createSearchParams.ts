import { PostListParams } from "../model/type"

export const createSearchParams = (params: PostListParams) => {
  const searchParams = new URLSearchParams()

  const paramMapping = {
    skip: params.skip?.toString(),
    limit: params.limit?.toString(),
    search: params.searchQuery,
    sortKey: params.sortKey,
    sortOrder: params.sortOrder,
    tag: params.selectedTag,
  }

  Object.entries(paramMapping).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value)
    }
  })

  return searchParams
}
