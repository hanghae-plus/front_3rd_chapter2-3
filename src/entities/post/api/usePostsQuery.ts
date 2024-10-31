import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { SortOrder } from "../lib/usePostQueryParams"
import {
  FetchPostsPayload,
  FetchPostsResponse,
  PostsResponse,
} from "../model/types"
import { postQueryKeys } from "./post.queries"
import { postApi } from "./postApi"

export type usePostsQueryProps = FetchPostsPayload & {
  searchQuery?: string
  selectedTag?: string

  sortBy?: string
  sortOrder?: SortOrder
}

export const usePostsQuery = (payload: usePostsQueryProps) => {
  const { limit, skip, searchQuery, selectedTag } = payload

  // 글쓴이 정보를 가져오는 함수
  const fetchAuthors = async () => {
    const authorsData = await postApi.fetchAuthors()
    return authorsData.users
  }

  // 게시물 데이터를 가져오는 함수 (태그와 검색 쿼리에 따라 처리)
  const fetchPostsData = async (): Promise<FetchPostsResponse> => {
    if (selectedTag && selectedTag !== "all") {
      return await postApi.fetchPostsByTag(selectedTag)
    }

    if (searchQuery) {
      return await postApi.searchPosts(searchQuery)
    }

    return await postApi.fetchPosts({ limit, skip })
  }

  // 게시물과 글쓴이 정보를 함께 가져오는 함수
  const fetchPostsWithAuthors = async (): Promise<PostsResponse> => {
    const [authors, postsData] = await Promise.all([
      fetchAuthors(),
      fetchPostsData(),
    ])

    const postsWithAuthors = postsData.posts.map((post) => ({
      ...post,
      author: authors.find((user) => user.id === post.userId),
    }))

    return { posts: postsWithAuthors, total: postsData.total }
  }

  return useQuery({
    queryKey: postQueryKeys.list(payload),
    queryFn: () => fetchPostsWithAuthors(),
    placeholderData: keepPreviousData,
  })
}
