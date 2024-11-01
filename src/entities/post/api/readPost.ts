import { convertSearchParamsToString } from "@entities/post/services/URLServices"
import { SearchParams } from "@features/searchParams/types"
import { PostQueryResult } from "@entities/post/types"
import { fetchPost } from "./fetchPost"

export const readPostApi = async (
  params: SearchParams,
): Promise<PostQueryResult> => {
  const queryString = convertSearchParamsToString({ ...params })
  return await fetchPost(`${queryString}`)
}
