import { useQuery } from "@tanstack/react-query"
import { postApi } from "../../../entities/post/api/postApis"
import { PostResponse_t, TagResponse_t } from "../../../entities/post/model/types"
import { usePostStore } from "../model/usePostStore"

export const usePostFilters = (filters: {
  skip?: number
  limit?: number
  searchQuery?: string
  selectedTag?: string
}) => {
  const [setPosts] = usePostStore((state) => [state.setPosts])
  const { skip, limit, searchQuery, selectedTag } = filters

  const postsQuery = useQuery<PostResponse_t>({
    queryKey: ["posts", skip, limit, searchQuery, selectedTag],
    queryFn: async () => {
      if (searchQuery) {
        return postApi.searchPosts(searchQuery)
      } else if (selectedTag && selectedTag !== "all") {
        return postApi.fetchPostsByTag(selectedTag)
      } else {
        return postApi.fetchPosts({ skip, limit })
      }
    },
    onSuccess: (data) => {
      setPosts(data.posts)
    },
  })

  const tagsQuery = useQuery<TagResponse_t>({
    queryKey: ["tags"],
    queryFn: postApi.getTags,
  })

  return {
    posts: postsQuery.data?.posts ?? [],
    total: postsQuery.data?.total ?? 0,
    tags: tagsQuery.data ?? [],
    isLoading: postsQuery.isLoading || tagsQuery.isLoading,
    error: postsQuery.error || tagsQuery.error,
    refetchPosts: postsQuery.refetch,
  }
}
