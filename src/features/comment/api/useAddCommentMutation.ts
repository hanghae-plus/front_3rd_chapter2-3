import { useMutation } from "@tanstack/react-query"
import { Comment_i, NewComment_i } from "../../../entities/comment/model/types"
import { commentApi } from "../../../entities/comment/api/commentApis"

export const useAddCommentMutation = () => {
  return useMutation<Comment_i, Error, NewComment_i>(commentApi.addComment, {
    onSuccess: (data) => {
      console.log("onSuccess", data)
    },
  })
}
