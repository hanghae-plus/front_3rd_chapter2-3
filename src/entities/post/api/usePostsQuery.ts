import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { FetchPostsPayload } from "../model/types"
import { postQueryKeys } from "./post.queries"
import { postApi } from "./postApi"

export type usePostsQueryProps = FetchPostsPayload & {
  searchQuery?: string
  selectedTag?: string
}

export const usePostsQuery = (payload: usePostsQueryProps) => {
  const { limit, skip, searchQuery, selectedTag } = payload

  // 게시물 가져오기
  const fetchPosts = async () => {
    const { posts, total } = searchQuery
      ? await postApi.searchPosts(searchQuery)
      : await postApi.fetchPosts({ limit, skip })

    return { posts, total }
  }

  // 태그별 게시물 가져오기
  const fetchPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      return fetchPosts()
    }
    return await postApi.fetchPostsByTag(tag)
  }

  return useQuery({
    queryKey: postQueryKeys.list(payload),
    queryFn: () => (selectedTag ? fetchPostsByTag(selectedTag) : fetchPosts()),
    placeholderData: keepPreviousData,
  })
}
