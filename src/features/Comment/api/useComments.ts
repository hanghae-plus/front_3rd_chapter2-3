import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Comment } from "../../../entities/Comment/model/types"
import { commentApi } from "../../../entities/Comment/api/commentApi"

// 댓글 목록 조회 훅
export const useGetComments = (postId: string | number) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => commentApi.getComments(postId),
    staleTime: 1000 * 60, // 1분
    enabled: !!postId, // postId가 있을 때만 실행
  })
}

// 댓글 생성 훅
export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (comment: { body: string; postId: number | string; userId: number }) =>
      commentApi.createComment(comment),
    onSuccess: (_: unknown, variables: { body: string; postId: number | string; userId: number }) => {
      // 댓글 목록 갱신
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      })
    },
  })
}

// 댓글 수정 훅
export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) => commentApi.updateComment(id, body),
    onSuccess: (updatedComment: Comment) => {
      // 댓글이 속한 게시물의 댓글 목록 갱신
      queryClient.invalidateQueries({
        queryKey: ["comments", updatedComment.postId],
      })
    },
  })
}

// 댓글 삭제 훅
export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number; postId: string | number }) => commentApi.deleteComment(id),
    onSuccess: (_: unknown, variables: { id: number; postId: string | number }) => {
      // 댓글 목록 갱신
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      })
    },
  })
}
