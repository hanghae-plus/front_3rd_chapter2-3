import { useQuery, UseQueryResult } from "@tanstack/react-query"
import { fetchPostsApi } from "../../../entities/post/api"
import { PostsDTO } from "../../../entities/post/model/types"
import { User } from "../../../entities/user/model/types"
import { fetchPostsByTagApi, searchPostsApi } from "../../post-filter/api"
import { usePostQueryStore } from "../model/postQueryStore"
import { PostWithUser } from "../model/types"

export const useQueryPosts = (
  users: User[],
  options: {
    tag?: string
    searchQuery?: string
    skip: number
    limit: number
    sortBy?: string
    sortOrder?: string
  },
): UseQueryResult<PostWithUser[]> => {
  const { tag, searchQuery, skip, limit } = options
  const { activeQuery } = usePostQueryStore()

  return useQuery<PostsDTO, Error, PostWithUser[]>({
    queryKey: ["posts", { tag, searchQuery, limit, skip, activeQuery }],
    queryFn: () => {
      if (activeQuery === "tag" && tag && tag !== "all") {
        return fetchPostsByTagApi(tag)
      } else if (activeQuery === "search" && searchQuery) {
        return searchPostsApi(searchQuery)
      }
      return fetchPostsApi(limit, skip)
    },
    select: (data) => {
      return (
        data.posts.map((post) => ({
          ...post,
          author: users.find((user) => user.id === post.userId) || { id: 0, username: "Unknown", image: "" },
        })) || []
      )
    },
  })
}
