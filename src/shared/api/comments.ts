import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./query-keys"
import type { CommentsResponse } from "@/entities/comment/model/types"

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: queryKeys.comments.byPost(postId),
    queryFn: async () => {
      const [commentsResponse, usersResponse] = await Promise.all([
        fetch(`/api/comments/post/${postId}`),
        fetch("/api/users?limit=0&select=username,image"),
      ])

      if (!commentsResponse.ok) throw new Error("Failed to fetch comments")
      const commentsData = (await commentsResponse.json()) as CommentsResponse
      const usersData = await usersResponse.json()

      return {
        ...commentsData,
        comments: commentsData.comments.map((comment) => ({
          ...comment,
          user: usersData.users.find((user) => user.id === comment.userId),
        })),
      }
    },
    enabled: !!postId,
  })
}
