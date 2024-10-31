import { useMutation, useQuery } from "@tanstack/react-query"
import { postApi } from "../../../entities/post/api/postApi"
import { NewPostDto, UpdatePostDto } from "../../../entities/post/model/type"

export const postKeys = {
  all: ["posts"] as const,
  byTag: (tag: string) => [...postKeys.all, "tag", tag] as const,
  search: (query: string) => [...postKeys.all, "search", query] as const,
  byId: (id: number) => [...postKeys.all, "id", id] as const,
}

export const usePosts = ({ limit = 10, skip = 0 }: { limit: number; skip: number }) => {
  return useQuery({
    queryKey: postKeys.all,
    queryFn: () => postApi.get.posts({ limit, skip }),
  })
}

export const usePostsByTag = ({ tag, limit = 10, skip = 0 }: { tag: string; limit?: number; skip?: number }) => {
  console.log("🚀 ~ usePostsByTag ~ limit:", limit)
  return useQuery({
    queryKey: postKeys.byTag(tag),
    queryFn: () => postApi.get.postsByTag({ tag, limit, skip }),
  })
}

export const useAddPost = () => {
  // const queryClient = useQueryClient()

  return useMutation({
    mutationKey: postKeys.all,
    mutationFn: (newPost: NewPostDto) => postApi.post.addPost(newPost),
  })
}

export const useDeletePost = () => {
  return useMutation({
    mutationKey: postKeys.all,
    mutationFn: (id: number) => postApi.delete.post(id),
  })
}

export const useSearchPosts = (searchQuery: string) => {
  return useQuery({
    queryKey: postKeys.search(searchQuery),
    queryFn: () => postApi.get.searchPosts(searchQuery),
    enabled: !!searchQuery,
  })
}

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: (post: UpdatePostDto) => postApi.put.updatePost(post),
    mutationKey: postKeys.all,
  })
}
