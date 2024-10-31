import { useMutation } from "@tanstack/react-query"
import { commentApi } from "../../../entities/comment/api/commentApis"
import { Comments_i } from "../../../entities/comment/model/types"

export const useFetchCommentMutation = () => {
  return useMutation<Comments_i, Error, number>(commentApi.fetchComment, {
    onSuccess: (data) => {
      console.log("onSuccess", data)
    },
  })
}
