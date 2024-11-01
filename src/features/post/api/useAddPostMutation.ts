import { useMutation } from "@tanstack/react-query"
import { postQueryKeys } from "../../../entities/post/api/post.queries"
import { postApi } from "../../../entities/post/api/postApi"
import { useAttachAuthorToPost } from "../../../entities/post/model/attachAuthorToPost"
import { updatePostsList } from "../../../entities/post/model/store"
import { PostsResponse } from "../../../entities/post/model/types"
import { queryClient } from "../../../shared/api"

/** 게시물 추가 */
export const useAddPostMutation = () => {
  const { attachAuthor } = useAttachAuthorToPost()

  return useMutation({
    mutationFn: postApi.addPost,
    onSuccess: async (addedPostDTO) => {
      const addedPost = attachAuthor(addedPostDTO)

      queryClient.setQueriesData<PostsResponse>(
        { queryKey: postQueryKeys.lists() },
        (oldData) => updatePostsList(oldData, addedPost, "add"),
      )
    },
  })
}
