import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { postApi } from "../../../entities/post/api/postApi"
import { NewPostDto } from "../../../entities/post/model/type"

export const postKeys = {
  all: ["posts"] as const,
  byTag: (tag: string) => [...postKeys.all, "tag", tag] as const,
  search: (query: string) => [...postKeys.all, "search", query] as const,
}

export const usePosts = ({ limit = 10, skip = 0 }: { limit: number; skip: number }) => {
  return useQuery({
    queryKey: postKeys.all,
    queryFn: () => postApi.get.posts({ limit, skip }),
  })
}

export const usePostsByTag = ({ tag, limit = 10, skip = 0 }: { tag: string; limit?: number; skip?: number }) => {
  return useQuery({
    queryKey: postKeys.byTag(tag),
    queryFn: () => postApi.get.postsByTag({ tag, limit, skip }),
  })
}

export const useAddPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newPost: NewPostDto) => postApi.post.addPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => postApi.delete.post(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all })
    },
  })
}

export const useSearchPosts = (searchQuery: string) => {
  return useQuery({
    queryKey: postKeys.search(searchQuery),
    queryFn: () => postApi.get.searchPosts(searchQuery),
    enabled: !!searchQuery,
    staleTime: 1000 * 60 * 5,
  })
}
