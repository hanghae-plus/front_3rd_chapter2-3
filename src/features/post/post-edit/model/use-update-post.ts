import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api/query-keys"
import type { Post } from "@/entities/post/model/types"

interface UseUpdatePostOptions {
  onSuccess?: () => void
}

export const useUpdatePost = (options?: UseUpdatePostOptions) => {
  const queryClient = useQueryClient()
  const [editingPost, setEditingPost] = useState<Post | null>(null)

  const { mutate } = useMutation({
    mutationFn: async (post: Post) => {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })
      if (!response.ok) throw new Error("Failed to update post")
      return response.json() as Promise<Post>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
      options?.onSuccess?.()
    },
  })

  return {
    mutate,
    editingPost,
    setEditingPost,
  }
}
