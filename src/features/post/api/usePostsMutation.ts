import { createPostApi, deletePostApi, IPost, updatePostApi } from "../../../entities/post/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const usePostAddMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createPostApi,
    onSuccess: (data: IPost) => {
      queryClient.setQueryData(["posts"], (oldData: IPost[]) => {
        return [data, ...oldData]
      })
    },
    onError: (error) => {
      console.error("게시물 추가 오류:", error)
    },
  })
}

export const usePostUpdateMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePostApi,
    onSuccess: (data: IPost) => {
      queryClient.setQueryData(["posts"], (oldData: IPost[]) => {
        return oldData.map((post: IPost) => (post.id === data.id ? data : post))
      })
    },
    onError: (error) => {
      console.error("게시물 업데이트 오류:", error)
    },
  })
}

export const usePostDeleteMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deletePostApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], (oldData: IPost[]) => {
        return oldData.filter((post) => post.id !== data.id)
      })
    },
    onError: (error) => {
      console.error("게시물 삭제 오류:", error)
    },
  })
}
