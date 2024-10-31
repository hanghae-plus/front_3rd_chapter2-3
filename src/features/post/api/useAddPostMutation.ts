import { useMutation } from "@tanstack/react-query"
import { NewPost_i, Post_i } from "../../../entities/post/model/types"
import { postApi } from "../../../entities/post/api/postApis"

export const useAddPostMutation = () => {
  return useMutation<Post_i, Error, NewPost_i>(postApi.addPost, {
    onSuccess: (data) => {
      console.log("onSuccess", data)
    },
  })
}
