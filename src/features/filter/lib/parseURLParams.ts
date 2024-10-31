import { SearchParams } from "@features/filter/model"

export const parseURLParams = (locationSearch: string): SearchParams => {
  const params = new URLSearchParams(locationSearch)
  
  return {
    searchQuery: params.get("search") || "",
    skip: parseInt(params.get("skip") || "0"),
    limit: parseInt(params.get("limit") || "10"),
    sortBy: params.get("sortBy") || "",
    sortOrder: params.get("sortOrder") || "asc",
    selectedTag: params.get("tag") || "",
  }
} 