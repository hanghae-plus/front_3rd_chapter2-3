import { useMutation } from "@tanstack/react-query"
import { postQueryKeys } from "../../../entities/post/api/post.queries"
import { postApi } from "../../../entities/post/api/postApi"
import { useAttachAuthorToPost } from "../../../entities/post/model/attachAuthorToPost"
import { updatePostsList } from "../../../entities/post/model/store"
import { PostsResponse } from "../../../entities/post/model/types"
import { queryClient } from "../../../shared/api"

/** 게시물 업데이트 */
export const useUpdatePostMutation = () => {
  const { attachAuthor } = useAttachAuthorToPost()

  return useMutation({
    mutationFn: postApi.updatePost,
    onSuccess: (updatedPostDTO) => {
      const updatedPost = attachAuthor(updatedPostDTO)

      queryClient.setQueriesData<PostsResponse>(
        { queryKey: postQueryKeys.lists() },
        (oldData) => updatePostsList(oldData, updatedPost, "update"),
      )
    },
  })
}
