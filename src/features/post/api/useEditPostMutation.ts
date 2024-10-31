import { useMutation } from "@tanstack/react-query"
import { Post_i } from "../../../entities/post/model/types"
import { postApi } from "../../../entities/post/api/postApis"

export const useEditPostMutation = () => {
  return useMutation<Post_i, Error, Post_i>(postApi.editPost, {
    onSuccess: (data) => {
      console.log("onSuccess", data)
    },
  })
}
