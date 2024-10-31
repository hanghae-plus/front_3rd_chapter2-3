import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deletePostApi, updatePostApi } from "../../../entities/post/api"
import { Post, PostDto } from "../../../entities/post/model/types.ts"
import { deletePost, updatePost } from "../../../entities/post/model"

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePostApi,
    onSuccess: (updatedPost: Post) => {
      queryClient.setQueriesData<PostDto>({ queryKey: ["posts"] }, (prevData) => {
        if (!prevData) return
        return updatePost(prevData, updatedPost)
      })
    },
  })
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePostApi,
    onSuccess: (deletedPost) => {
      queryClient.setQueriesData<PostDto>({ queryKey: ["posts"] }, (prevData) => {
        if (!prevData) return
        return deletePost(prevData, deletedPost.id)
      })
    },
  })
}
