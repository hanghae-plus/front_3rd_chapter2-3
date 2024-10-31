import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import * as commentApi from "./comment"
import type { Comment, NewComment } from "../../../shared/types"

export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  list: (postId: number) => [...commentKeys.lists(), postId] as const,
}

export const useCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: commentKeys.list(postId),
    queryFn: () => commentApi.fetchComments(postId),
    enabled: !!postId,
  })
}

export const useCommentMutations = () => {
  const queryClient = useQueryClient()

  const addCommentMutation = useMutation({
    mutationFn: (newComment: NewComment) => commentApi.addComment(newComment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.list(variables.postId!),
      })
    },
  })

  const updateCommentMutation = useMutation({
    mutationFn: (comment: Comment) => commentApi.updateComment(comment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.list(variables.postId),
      })
    },
  })

  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => commentApi.deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.lists(),
      })
    },
  })

  return {
    addCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
  }
}
