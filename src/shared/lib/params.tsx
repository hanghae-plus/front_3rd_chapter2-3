interface URLParams {
  skip?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: string
  tag?: string
}

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
    skip: parseInt(searchParams.get("skip") || "0"),
    limit: parseInt(searchParams.get("limit") || "10"),
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "",
    sortOrder: searchParams.get("sortOrder") || "asc",
    tag: searchParams.get("tag") || "",
  }
}
