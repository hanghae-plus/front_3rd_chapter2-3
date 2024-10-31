import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePostApi } from "../../../entities/post/api"
import { Post, PostsDTO } from "../../../entities/post/model/types"
import { usePostParamsStore } from "../model/postParamsStore"
import { usePostQueryStore } from "../model/postQueryStore"

export const useMutationPostUpdate = () => {
  const queryClient = useQueryClient()
  const { selectedTag, searchQuery, skip, limit } = usePostParamsStore()
  const { activeQuery } = usePostQueryStore()

  return useMutation({
    mutationFn: (post: Post) => updatePostApi(post),
    onSuccess: (response) => {
      queryClient.setQueryData(
        ["posts", { tag: selectedTag, searchQuery, limit, skip, activeQuery }],
        (data: PostsDTO) => {
          console.log("data", data)
          console.log("response", response)
          const updatedPosts = {
            ...data,
            posts: data.posts.map((post) => (post.id === response.id ? response : post)) as Post[],
          }
          return updatedPosts
        },
      )
    },
  })
}
