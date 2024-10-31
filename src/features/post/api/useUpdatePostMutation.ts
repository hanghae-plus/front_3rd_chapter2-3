import { useMutation } from "@tanstack/react-query"
import { postQueryKeys } from "../../../entities/post/api/post.queries"
import { postApi } from "../../../entities/post/api/postApi"
import { PostsResponse } from "../../../entities/post/model/types"
import { queryClient } from "../../../shared/api"

export const useUpdatePostMutation = () => {
  return useMutation({
    mutationFn: postApi.updatePost,
    onSuccess: (updatedPost) => {
      const [[queryKey, oldData]] = queryClient.getQueriesData<PostsResponse>({
        queryKey: postQueryKeys.lists(),
      })

      const posts = oldData?.posts ?? []
      const total = oldData?.total ?? 0

      const newData: PostsResponse = {
        posts: posts.map((post) =>
          post.id === updatedPost.id ? { ...post, ...updatedPost } : post,
        ),
        total,
      }

      queryClient.setQueriesData({ queryKey }, newData)
    },
  })
}
