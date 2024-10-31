import { useMutation, useQuery } from "@tanstack/react-query"
import { commentsApi } from "../../api/comments.api"
import { queryClient } from "../../../../shared/lib/react-query"
import { Comment } from "../../model/types"

export const commentKeys = {
  all: ["comments"] as const,
  lists: () => [...commentKeys.all, "list"] as const,
  list: (postId: number) => [...commentKeys.lists(), postId] as const,
  detail: (id: number) => [...commentKeys.all, "detail", id] as const,
  likes: (id: number) => [...commentKeys.detail(id), "likes"] as const,
} as const

export const useComments = (postId: number) => {
  return useQuery({
    queryKey: commentKeys.list(postId),
    queryFn: () => commentsApi.getComments(postId),
  })
}

export const useAddCommentMutation = (postId?: number) => {
  return useMutation({
    mutationKey: commentKeys.all,
    mutationFn: (data: {
      body: string
      postId: number | null
      userId: number
    }) => commentsApi.addComment(data),
    onSuccess: (newComment) => {
      if (postId) {
        const currentComments = queryClient.getQueryData<{ comments: Comment[] }>(
          commentKeys.list(postId)
        )
        if (currentComments) {
          queryClient.setQueryData(
            commentKeys.list(postId),
            {
              comments: [...currentComments.comments, newComment]
            }
          )
        } else {
          queryClient.invalidateQueries({
            queryKey: commentKeys.list(postId)
          })
        }
      }
    }
  })
}

export const useUpdateCommentMutation = (postId?: number) => {
  return useMutation({
    mutationKey: commentKeys.all,
    mutationFn: ({ id, body }: { id: number; body: string }) =>
      commentsApi.updateComment(id, body),
    onMutate: async ({ id, body }) => {
      if (postId) {
        await queryClient.cancelQueries({
          queryKey: commentKeys.list(postId)
        })

        const previousComments = queryClient.getQueryData<{ comments: Comment[] }>(
          commentKeys.list(postId)
        )

        if (previousComments) {
          queryClient.setQueryData(
            commentKeys.list(postId),
            {
              comments: previousComments.comments.map(comment =>
                comment.id === id
                  ? { ...comment, body }
                  : comment
              )
            }
          )
        }

        return { previousComments }
      }
    },
    onError: (_, __, context) => {
      if (postId && context?.previousComments) {
        queryClient.setQueryData(
          commentKeys.list(postId),
          context.previousComments
        )
      }
    },
    onSuccess: (updatedComment, { id }) => {
      if (postId) {
        const currentComments = queryClient.getQueryData<{ comments: Comment[] }>(
          commentKeys.list(postId)
        )

        if (currentComments) {
          queryClient.setQueryData(
            commentKeys.list(postId),
            {
              comments: currentComments.comments.map(comment =>
                comment.id === id
                  ? { ...comment, ...updatedComment }
                  : comment
              )
            }
          )
        }
      }
    }
  })
}

export const useDeleteCommentMutation = () => {
  return useMutation({
    mutationKey: commentKeys.all,
    mutationFn: (id: number) => commentsApi.deleteComment(id),
  })
}

export const useLikeCommentMutation = (postId: number) => {
  return useMutation({
    mutationKey: ['comments', 'like'],
    mutationFn: (id: number) => commentsApi.likeComment(id),
    onMutate: async (id: number) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({
        queryKey: commentKeys.list(postId),
      })

      // 현재 댓글 목록 저장
      const previousComments = queryClient.getQueryData<{ comments: Comment[] }>(
        commentKeys.list(postId)
      )

      // 낙관적 업데이트
      if (previousComments) {
        const updatedComments = {
          comments: previousComments.comments.map(comment =>
            comment.id === id
              ? { ...comment, likes: (comment.likes || 0) + 1 }
              : comment
          )
        }
        queryClient.setQueryData(
          commentKeys.list(postId),
          updatedComments
        )
      }

      return { previousComments }
    },
    onError: (_, __, context) => {
      // 에러 시에만 롤백
      if (context?.previousComments) {
        queryClient.setQueryData(
          commentKeys.list(postId),
          context.previousComments
        )
      }
    },
    // onSettled 제거 또는 성공 시에만 캐시 업데이트
    onSuccess: (updatedComment, id) => {
      const currentComments = queryClient.getQueryData<{ comments: Comment[] }>(
        commentKeys.list(postId)
      )
      
      if (currentComments) {
        queryClient.setQueryData(
          commentKeys.list(postId),
          {
            comments: currentComments.comments.map(comment =>
              comment.id === id
                ? { ...comment, updatedComment }
                : comment
            )
          }
        )
      }
    }
  })
}