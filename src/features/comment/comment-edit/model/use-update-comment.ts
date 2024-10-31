import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api/query-keys"
import type { Comment } from "@/entities/comment/model/types"

interface UseUpdateCommentOptions {
  onSuccess?: () => void
}

export const useUpdateComment = (options?: UseUpdateCommentOptions) => {
  const queryClient = useQueryClient()
  const [editingComment, setEditingComment] = useState<Comment | null>(null)

  const { mutate } = useMutation({
    mutationFn: async (comment: Comment) => {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: comment.body }),
      })
      if (!response.ok) throw new Error("Failed to update comment")
      return response.json() as Promise<Comment>
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byPost(data.postId) })
      options?.onSuccess?.()
    },
  })

  return {
    mutate,
    editingComment,
    setEditingComment,
  }
}
