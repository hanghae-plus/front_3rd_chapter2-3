import {
  getQueryParameters,
  useUpdateQueryParameter,
} from "../../../shared/lib/queryParams"

export type SortOrder = "asc" | "desc"

type PostQueryParams = {
  skip: number
  limit: number
  search: string
  sortBy: string
  sortOrder: SortOrder
  tag: string
}

type UsePostQueryParams = () => {
  queryParams: PostQueryParams
  updateQueryParam: (params: Partial<PostQueryParams>) => void
}

const DEFAULT_POST_QUERY_PARAMS: PostQueryParams = {
  skip: 0,
  limit: 10,
  search: "",
  sortBy: "",
  sortOrder: "asc",
  tag: "",
}

export const usePostQueryParams: UsePostQueryParams = () => {
  const { limit, skip, sortOrder, ...rest } =
    getQueryParameters<PostQueryParams>(DEFAULT_POST_QUERY_PARAMS)
  const updateQueryParam = useUpdateQueryParameter<PostQueryParams>()

  return {
    queryParams: {
      limit: parseInt(limit, 10),
      skip: parseInt(skip, 10),
      sortOrder: sortOrder as PostQueryParams["sortOrder"],
      ...rest,
    },
    updateQueryParam,
  }
}
