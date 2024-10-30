import { useMutation, useQuery } from "@tanstack/react-query"
import { commentsApi } from "../../api/comments.api"

export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  list: (postId: number) => [...commentKeys.lists(), postId] as const,
  detail: (id: number) => [...commentKeys.all, "detail", id] as const,
}

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: commentKeys.list(postId),
    queryFn: () => commentsApi.getComments(postId),
  })
}

export const useAddCommentMutation = () => {
  return useMutation({
    mutationKey: commentKeys.all,
    mutationFn: (data: {
      body: string
      postId: number | null
      userId: number
    }) => commentsApi.addComment(data),
  })
}

export const useUpdateCommentMutation = () => {
  return useMutation({
    mutationKey: commentKeys.all,
    mutationFn: ({ id, body }: { id: number; body: string }) =>
      commentsApi.updateComment(id, body),
  })
}

export const useDeleteCommentMutation = () => {
  return useMutation({
    mutationKey: commentKeys.all,
    mutationFn: (id: number) => commentsApi.deleteComment(id),
  })
}
