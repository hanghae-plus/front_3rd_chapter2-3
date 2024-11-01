import { buildURLPath } from "@features/filter/lib"
import { SearchParams } from "@features/filter/model"
import { PostResponse } from "@entities/post/model"

export const readPostApi = async (
  params: SearchParams,
): Promise<PostResponse> => {
  try {
    const queryString = buildURLPath({ ...params })
    const response = await fetch(`/api/posts${queryString}`)
    return await response.json()
  } catch (e) {
    throw new Error("Failed to read posts" + e)
  }
}
