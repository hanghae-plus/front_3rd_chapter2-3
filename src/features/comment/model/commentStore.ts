import { CommentRecord } from "../../../entities/comment/model/types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { commentsApi } from "../api"
import { queryKeys } from "../../../lib/query/queryKeys"
import { queryClient } from "../../../lib/query/queryClient"
import {
  addToCommentsRecord,
  removeFromCommentsRecord,
  updateInCommentsMap,
} from "../../../entities/comment/model/utils"

export const useCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: queryKeys.comments.byPost(postId),
    queryFn: async () => {
      const response = await commentsApi.fetchByPost(postId)
      return {
        commentsById: { [postId]: response.comments },
        total: response.total,
      }
    },
    enabled: !!postId,
  })
}

export const useCommentMutations = (postId: number) => {
  const createComment = useMutation({
    mutationFn: commentsApi.create,
    onSuccess: (newComment) => {
      queryClient.setQueriesData<{ commentsById: CommentRecord; total: number }>(
        queryKeys.comments.byPost(postId),
        (prev) => {
          if (!prev)
            return {
              commentsById: { [postId]: [newComment] },
              total: 1,
            }
          return {
            commentsById: addToCommentsRecord(prev.commentsById, postId, newComment),
            total: prev.total + 1,
          }
        },
      )
    },
  })

  const updateComment = useMutation({
    mutationFn: commentsApi.update,
    onSuccess: (updatedComment) => {
      queryClient.setQueriesData<{ commentsById: CommentRecord; total: number }>(
        queryKeys.comments.byPost(postId),
        (prev) => {
          if (!prev) return prev
          return {
            commentsById: updateInCommentsMap(prev.commentsById, postId, updatedComment),
            total: prev.total,
          }
        },
      )
    },
  })

  const deleteComment = useMutation({
    mutationFn: commentsApi.delete,
    onSuccess: (commentId) => {
      queryClient.setQueriesData<{ commentsById: CommentRecord; total: number }>(
        queryKeys.comments.byPost(postId),
        (prev) => {
          if (!prev) return prev
          return {
            commentsById: removeFromCommentsRecord(prev.commentsById, postId, commentId),
            total: prev.total - 1,
          }
        },
      )
    },
  })

  const likeComment = useMutation({
    mutationFn: ({ commentId, likes }: { commentId: number; likes: number }) => commentsApi.like(commentId, likes + 1),
    onSuccess: (updatedComment) => {
      queryClient.setQueriesData<{ commentsById: CommentRecord; total: number }>(
        queryKeys.comments.byPost(postId),
        (prev) => {
          if (!prev) return prev
          return {
            commentsById: updateInCommentsMap(prev.commentsById, postId, updatedComment),
            total: prev.total,
          }
        },
      )
    },
  })

  return { createComment, updateComment, deleteComment, likeComment }
}

export const invalidateCommentQueries = (postId: number) => {
  queryClient.invalidateQueries(queryKeys.comments.byPost(postId))
}

export const prefetchComments = async (postId: number) => {
  await queryClient.prefetchQuery(queryKeys.comments.byPost(postId), () => commentsApi.fetchByPost(postId))
}
