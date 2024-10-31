import {
  getQueryParameters,
  useUpdateQueryParameter,
} from "../../../shared/lib/queryParams"
import { PaginationType } from "../../../shared/model/paginationType"

export type UpdateQueryParam = (params: Partial<PostQueryParams>) => void
export type SortOrder = "asc" | "desc"

type PostQueryParams = PaginationType & {
  search: string
  sortBy: string
  sortOrder: SortOrder
  tag: string
}

type UsePostQueryParams = () => {
  queryParams: PostQueryParams
  updateQueryParam: UpdateQueryParam
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
