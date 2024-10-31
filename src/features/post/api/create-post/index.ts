import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AddPostBody, Post } from "../../../../entities/post/model/types"

const addPost = async (body: AddPostBody) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const data = await response.json()

  return data
}

export const useAddPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addPost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] })

      const previousPosts = queryClient.getQueryData(["posts"])

      queryClient.setQueryData(["posts"], (old: { posts: Post[] }) => ({
        ...old,
        posts: [
          { ...newPost, id: 1, reactions: { likes: 0, dislikes: 0 }, tags: [], views: 0 },
          ...old.posts.map((post) => ({ ...post, id: post.id + 1 })),
        ],
      }))

      return { previousPosts }
    },
  })
}
