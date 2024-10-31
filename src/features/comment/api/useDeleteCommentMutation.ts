import { useMutation } from "@tanstack/react-query"
import { commentApi } from "../../../entities/comment/api/commentApis"

export const useDeleteCommentMutation = () => {
  return useMutation<void, Error, { id: number }>(({ id }) => commentApi.deleteComment(id), {
    onSuccess: (data) => {
      console.log("onSuccess", data)
    },
  })
}
