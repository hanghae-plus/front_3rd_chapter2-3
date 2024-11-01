import { useMutation } from "@tanstack/react-query"
import { postQueryKeys } from "../../../entities/post/api/post.queries"
import { postApi } from "../../../entities/post/api/postApi"
import { useAttachAuthorToPost } from "../../../entities/post/model/attachAuthorToPost"
import { updatePostsList } from "../../../entities/post/model/store"
import { PostsResponse } from "../../../entities/post/model/types"
import { queryClient } from "../../../shared/api"

/** 게시물 삭제 */
export const useDeletePostMutation = () => {
  const { attachAuthor } = useAttachAuthorToPost()

  return useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: (deletedPostDTO) => {
      const deletedPost = attachAuthor(deletedPostDTO)

      queryClient.setQueriesData<PostsResponse>(
        { queryKey: postQueryKeys.lists() },
        (oldData) => updatePostsList(oldData, deletedPost, "delete"),
      )
    },
  })
}
