import { useMutation } from "@tanstack/react-query"
import { postApi } from "../../../entities/post/api/postApis"

export const useDeletePostMutation = () => {
  return useMutation<void, Error, { id: number }>(({ id }) => postApi.deletePost(id), {
    onSuccess: (data) => {
      console.log("onSuccess", data)
    },
  })
}
