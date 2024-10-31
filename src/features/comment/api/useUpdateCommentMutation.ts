import { useMutation } from "@tanstack/react-query"
import { Comment_i } from "../../../entities/comment/model/types"
import { commentApi } from "../../../entities/comment/api/commentApis"

export const useUpdateCommentMutation = () => {
  return useMutation<Comment_i, Error, Comment_i>(commentApi.updateComment, {
    onSuccess: (data) => {
      console.log("onSuccess", data)
    },
  })
}
