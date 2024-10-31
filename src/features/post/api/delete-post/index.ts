import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeletePostParams, Post } from "../../../../entities/post/model/types"

const deletePost = async (params: DeletePostParams) => {
  const { id } = params

  return await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePost,
    onMutate: async (params) => {
      const { id } = params

      await queryClient.cancelQueries({ queryKey: ["posts"] })

      const previousPosts = queryClient.getQueryData(["posts"])

      queryClient.setQueryData(["posts"], (old: { posts: Post[] }) => ({
        ...old,
        posts: old.posts.filter((post) => post.id !== id),
      }))

      return { previousPosts }
    },
  })
}
