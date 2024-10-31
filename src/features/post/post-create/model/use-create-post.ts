import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api/query-keys"
import type { Post } from "@/entities/post/model/types"

interface CreatePostData {
  title: string
  body: string
  userId: number
}

interface UseCreatePostOptions {
  onSuccess?: () => void
}

export const useCreatePost = (options?: UseCreatePostOptions) => {
  const queryClient = useQueryClient()
  const [newPost, setNewPost] = useState<CreatePostData>({
    title: "",
    body: "",
    userId: 1,
  })

  const { mutate } = useMutation({
    mutationFn: async (post: CreatePostData) => {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })
      if (!response.ok) throw new Error("Failed to create post")
      return response.json() as Promise<Post>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
      setNewPost({ title: "", body: "", userId: 1 })
      options?.onSuccess?.()
    },
  })

  return {
    mutate,
    newPost,
    setNewPost,
  }
}
