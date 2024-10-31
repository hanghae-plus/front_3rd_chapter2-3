import useQueryParams from "../../shared/lib/useURLParams.ts"

const defaultPostParams = {
  skip: 0,
  limit: 10,
  searchQuery: "",
  sortBy: "",
  sortOrder: "asc",
  selectedTag: "",
}

const usePostQueryParams = () => useQueryParams({ defaultValues: defaultPostParams })

export default usePostQueryParams
