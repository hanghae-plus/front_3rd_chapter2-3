import { useQuery } from "@tanstack/react-query"
import { PostsResponseType } from "../model/types"
import { postApi } from "./"

export interface PostsQueryProps {
  limit: number
  skip: number
  tag: string
  searchQuery: string
}

export const usePostsQuery = ({ limit, skip, tag, searchQuery }: PostsQueryProps) => {
  return useQuery<PostsResponseType, Error>({
    queryKey: ["posts", { limit, skip, tag, searchQuery }],
    queryFn: async () => {
      if (searchQuery) return (await postApi.searchPosts(searchQuery)).data
      if (tag && tag !== "all") return (await postApi.fetchPostsByTag(tag)).data
      return (await postApi.fetchPosts({ limit, skip })).data
    },
    staleTime: 5 * 60 * 1000,
  })
}
