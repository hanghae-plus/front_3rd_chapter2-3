import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api/query-keys"
import type { Comment } from "@/entities/comment/model/types"

interface CreateCommentData {
  body: string
  postId: number
  userId: number
}

interface UseCreateCommentOptions {
  postId: number
  onSuccess?: () => void
}

export const useCreateComment = ({ postId, onSuccess }: UseCreateCommentOptions) => {
  const queryClient = useQueryClient()
  const [newComment, setNewComment] = useState<CreateCommentData>({
    body: "",
    postId,
    userId: 1, // 임시 사용자 ID
  })

  const { mutate } = useMutation({
    mutationFn: async (comment: CreateCommentData) => {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment),
      })
      if (!response.ok) throw new Error("Failed to create comment")
      return response.json() as Promise<Comment>
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.byPost(postId) })
      setNewComment({ body: "", postId, userId: 1 })
      onSuccess?.()
    },
  })

  return {
    mutate,
    newComment,
    setNewComment,
  }
}
