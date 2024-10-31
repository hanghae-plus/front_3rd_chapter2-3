import { useMutation } from "@tanstack/react-query"
import { Comment_i } from "../../../entities/comment/model/types"
import { commentApi } from "../../../entities/comment/api/commentApis"

export const useLikeCommentMutation = () => {
  return useMutation<Comment_i, Error, { id: number; comment: Comment_i }>(
    ({ id, comment }) => commentApi.likeComment(id, comment),
    {
      onSuccess: (data) => {
        console.log("onSuccess", data)
      },
    },
  )
}
