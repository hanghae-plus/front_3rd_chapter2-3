import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Post, UpdatePostParams } from "../../../../entities/post/model/types"

const updatePost = async (params: UpdatePostParams): Promise<Post> => {
  const { id, post } = params

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  const data = await response.json()

  return data
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePost,
    onMutate: async (params) => {
      const { post: newPost } = params

      await queryClient.cancelQueries({ queryKey: ["posts"] })

      const previousPosts = queryClient.getQueryData(["posts"]) as { posts: Post[] }

      queryClient.setQueryData(["posts"], (old: { posts: Post[] }) => ({
        ...old,
        posts: old.posts.map((post) => (post.id === newPost.id ? newPost : post)),
      }))

      return { previousPosts }
    },
  })
}
