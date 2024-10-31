import { SearchParams } from "@features/filter/model"

export const initialSearchParams: SearchParams = {
  skip: 0,
  limit: 10,
  sortBy: "asc",
  sortOrder: "",
  searchQuery: "",
  selectedTag: "",
} 