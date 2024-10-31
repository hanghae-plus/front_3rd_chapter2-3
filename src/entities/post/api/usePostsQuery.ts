import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { SortType } from "../../../shared/model/types"
import {
  FetchPostsPayload,
  FetchPostsResponse,
  PostsResponse,
} from "../model/types"
import { postQueryKeys } from "./post.queries"
import { postApi } from "./postApi"

export type usePostsQueryProps = FetchPostsPayload &
  SortType & {
    search?: string
    selectedTag?: string
  }

export const usePostsQuery = (payload: usePostsQueryProps) => {
  const { limit, skip, search, selectedTag } = payload

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

    if (search) {
      return await postApi.searchPosts(search)
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

  const { data, ...query } = useQuery({
    queryKey: postQueryKeys.list(payload),
    queryFn: () => fetchPostsWithAuthors(),
    placeholderData: keepPreviousData,
  })

  return {
    data: {
      posts: data?.posts ?? [],
      total: data?.total ?? 0,
    },
    ...query,
  }
}
