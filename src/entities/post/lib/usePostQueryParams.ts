import {
  getQueryParameters,
  useUpdateQueryParameter,
} from "../../../shared/lib/queryParams"
import { PaginationType, SortType } from "../../../shared/model/types"

const DEFAULT_POST_QUERY_PARAMS: PostQueryParams = {
  skip: 0,
  limit: 10,
  search: "",
  sortBy: "",
  sortOrder: "asc",
  tag: "",
}

type PostQueryParams = PaginationType &
  SortType & {
    search: string
    tag: string
  }

/** 게시물(post) URL 쿼리를 업데이트하는 함수 */
export type UpdatePostQueryParam = (params: Partial<PostQueryParams>) => void

/**
 * 게시글(Post)과 관련된 URL 쿼리 매개변수를 관리하는 훅
 *
 * @example
 * const { queryParams, updateQueryParam } = usePostQueryParams();
 *
 * console.log(queryParams.limit); // 현재 limit 값 출력
 * updateQueryParam({ search: 'React' }); // 검색어를 'React'로 업데이트
 */
export const usePostQueryParams = (): {
  queryParams: PostQueryParams
  updateQueryParam: UpdatePostQueryParam
} => {
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
    updateQueryParam: updateQueryParam,
  }
}
