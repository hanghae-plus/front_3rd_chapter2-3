import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { commentApi } from "../../../entities/comment/api/commentApi"
import { Comment, NewCommentDto } from "../../../entities/comment/model/type"

export const commentKeys = {
  all: ["comments"] as const,
  byPostId: (postId: number) => [...commentKeys.all, postId] as const,
}

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: commentKeys.byPostId(postId),
    queryFn: () => commentApi.get.comments(postId),
  })
}

export const useAddComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (comment: NewCommentDto) => commentApi.post.addComment(comment),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.byPostId(variables.postId),
      })
    },
  })
}

export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, postId, comments }: { id: number; postId: number; comments: Comment[] }) =>
      commentApi.patch.likeComment(id, postId, comments),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: commentKeys.byPostId(variables.postId),
      })
    },
  })
}
