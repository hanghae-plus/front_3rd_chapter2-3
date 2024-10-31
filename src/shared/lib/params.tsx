import { URLParams } from "../types"

export const updateURLParams = (params: URLParams, navigate: (path: string) => void) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value.toString())
    }
  })

  navigate(`?${searchParams.toString()}`)
}

export const getURLParams = (searchParams: URLSearchParams): URLParams => {
  return {
    skip: Number(searchParams.get("skip") || "0"),
    limit: Number(searchParams.get("limit") || "10"),
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "",
    sortOrder: searchParams.get("sortOrder") || "asc",
    tag: searchParams.get("tag") || "",
  }
}
