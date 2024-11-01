import { useMutation } from "@tanstack/react-query"
import { postApi } from "../../../entities/post/api/postApi"
import { PostsResponse } from "../../../entities/post/model/types"
import { queryClient } from "../../../shared/api"
import { getPostsQueryData } from "./getPostsQueryData"

/** 게시물 삭제 */
export const useDeletePostMutation = () => {
  return useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: (deletedPost) => {
      const [queryKey, { posts, total }] = getPostsQueryData()

      const newData: PostsResponse = {
        posts: posts.filter((post) => post.id !== deletedPost.id),
        total: total - 1,
      }

      queryClient.setQueriesData<PostsResponse>({ queryKey }, newData)
    },
  })
}
