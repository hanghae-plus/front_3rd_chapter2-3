import { useQuery } from "@tanstack/react-query"
import {
  fetchPostsDefaultApi,
  fetchPostsSearchApi,
  fetchPostsTagApi,
  IPost,
  IPostQueryResponse,
} from "../../../entities/post/api"

export const usePostsQuery = (queryParams, queryType, users) => {
  return useQuery({
    queryKey: ["posts", { queryParams }],
    queryFn: async () => {
      const { limit, skip, search, selectedTag, queryType } = queryParams

      switch (queryType) {
        case "default": {
          try {
            const postsResponse: IPostQueryResponse = await fetchPostsDefaultApi(limit, skip)

            const total = postsResponse.total
            const posts: IPost[] = postsResponse.posts.map((post: IPost) => ({
              ...post,
              author: users.find((user) => user.id === post.userId),
            }))

            return { posts, total }
          } catch (error) {
            console.error("게시물 가져오기 오류:", error)
            throw error
          }
        }
        case "search": {
          try {
            const postsResponse: IPostQueryResponse = await fetchPostsSearchApi(search)

            const total = postsResponse.total
            const posts: IPost[] = postsResponse.posts.map((post: IPost) => ({
              ...post,
              author: users.find((user) => user.id === post.userId),
            }))

            return { posts, total }
          } catch (error) {
            console.error("게시물 검색 오류:", error)
            throw error
          }
        }
        case "tag": {
          try {
            const postsResponse: IPostQueryResponse = await fetchPostsTagApi(selectedTag)

            const total = postsResponse.total
            const posts: IPost[] = postsResponse.posts.map((post: IPost) => ({
              ...post,
              author: users.find((user) => user.id === post.userId),
            }))

            return { posts, total }
          } catch (error) {
            console.error("게시물 태그 가져오기 오류:", error)
            throw error
          }
        }
      }
    },
  })
}
