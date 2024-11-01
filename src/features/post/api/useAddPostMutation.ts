import { useMutation } from "@tanstack/react-query"
import { postApi } from "../../../entities/post/api/postApi"
import { useAttachAuthorToPost } from "../../../entities/post/model/attachAuthorToPost"
import { PostsResponse } from "../../../entities/post/model/types"
import { queryClient } from "../../../shared/api"
import { getPostsQueryData } from "./getPostsQueryData"

/** 게시물 추가 */
export const useAddPostMutation = () => {
  const { attachAuthor } = useAttachAuthorToPost()

  return useMutation({
    mutationFn: postApi.addPost,
    onSuccess: async (addedPostDTO) => {
      const [queryKey, { posts, total }] = getPostsQueryData()

      const addedPost = attachAuthor(addedPostDTO)
      const newData: PostsResponse = {
        posts: [addedPost, ...posts],
        total: total + 1,
      }

      queryClient.setQueriesData<PostsResponse>({ queryKey }, newData)
    },
  })
}
