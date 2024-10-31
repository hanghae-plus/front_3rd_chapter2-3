import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePostApi } from "../../../entities/post/api"
import { usePostParamsStore } from "../model/postParamsStore"
import { PostsDTO } from "../../../entities/post/model/types"
import { usePostQueryStore } from "../model/postQueryStore"

export const useMutationPostDelete = () => {
  const queryClient = useQueryClient()
  const { selectedTag, searchQuery, skip, limit } = usePostParamsStore()
  const { activeQuery } = usePostQueryStore()

  return useMutation({
    mutationFn: (postId: number) => deletePostApi(postId),
    onSuccess: (response: number) => {
      queryClient.setQueryData(
        ["posts", { tag: selectedTag, searchQuery, limit, skip, activeQuery }],
        (data: PostsDTO) => {
          const updatedPosts = {
            ...data,
            posts: data.posts.filter((post) => post.id !== response),
          }
          return updatedPosts
        },
      )
    },
  })
}
