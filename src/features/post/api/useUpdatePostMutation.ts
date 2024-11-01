import { useMutation } from "@tanstack/react-query"
import { postApi } from "../../../entities/post/api/postApi"
import { PostsResponse } from "../../../entities/post/model/types"
import { queryClient } from "../../../shared/api"
import { getPostsQueryData } from "./getPostsQueryData"

/** 게시물 업데이트 */
export const useUpdatePostMutation = () => {
  return useMutation({
    mutationFn: postApi.updatePost,
    onSuccess: (updatedPost) => {
      const [queryKey, { posts, total }] = getPostsQueryData()

      const newData: PostsResponse = {
        posts: posts.map((post) =>
          post.id === updatedPost.id ? { ...post, ...updatedPost } : post,
        ),
        total,
      }

      queryClient.setQueriesData<PostsResponse>({ queryKey }, newData)
    },
  })
}
