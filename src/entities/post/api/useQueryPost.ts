import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { Post } from "../model/type"
import { fetchPostsApi, searchPostsApi } from "./"

// 게시물 가져오기
export const useQueryPosts = (limit: number, skip: number): UseQueryResult<Post[]> => {
  return useQuery<Post[], Error>({
    queryKey: ["posts", { limit, skip }],
    queryFn: () => fetchPostsApi(limit, skip),
  })
}

// 게시물 검색
export const useQuerySearchPosts = (searchQuery: string): UseQueryResult<Post[]> => {
  return useQuery<Post[], Error>({
    queryKey: ["searchPosts", searchQuery],
    queryFn: () => searchPostsApi(searchQuery),
  })
}
