import { useMutation } from "@tanstack/react-query"
import { postApi } from "../../../entities/post/api/postApi"
import { PostsResponse } from "../../../entities/post/model/types"
import { queryClient } from "../../../shared/api"
import { getPostsQueryData } from "./getPostsQueryData"

export const useAddPostMutation = () => {
  return useMutation({
    mutationFn: postApi.addPost,
    onSuccess: (addedPost) => {
      const [queryKey, { posts, total }] = getPostsQueryData()

      const newData: PostsResponse = {
        posts: [addedPost, ...posts],
        total: total + 1,
      }

      queryClient.setQueriesData<PostsResponse>({ queryKey }, newData)
    },
  })
}
