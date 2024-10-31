import { useMutation } from "@tanstack/react-query"
import { postQueryKeys } from "../../../entities/post/api/post.queries"
import { postApi } from "../../../entities/post/api/postApi"
import { PostsResponse } from "../../../entities/post/model/types"
import { queryClient } from "../../../shared/api"

export const useAddPostMutation = () => {
  return useMutation({
    mutationFn: postApi.addPost,
    onSuccess: (newPost) => {
      const [[queryKey, oldData]] = queryClient.getQueriesData<PostsResponse>({
        queryKey: postQueryKeys.lists(),
      })

      const posts = oldData?.posts ?? []
      const total = oldData?.total ?? 0

      const newData: PostsResponse = {
        posts: [newPost, ...posts],
        total: total + 1,
      }

      queryClient.setQueriesData({ queryKey }, newData)
    },
  })
}
