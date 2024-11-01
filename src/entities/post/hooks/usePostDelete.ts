import { searchParamsAtom } from "@features/searchParams/model/atom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PostQueryResult } from "@entities/post/types"
import { deletePostApi } from "@entities/post/api"
import { useAtomValue } from "jotai"

export const usePostDelete = () => {
  const queryClient = useQueryClient()
  const searchParams = useAtomValue(searchParamsAtom)

  const deletePostMutation = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (postId: number) => {
      queryClient.setQueryData(
        ["posts", searchParams],
        (oldData: PostQueryResult) => ({
          limit: oldData.limit,
          skip: oldData.skip,
          posts: (oldData?.posts || []).filter((post) => post.id !== postId),
          total: oldData?.total ? oldData?.total - 1 : 0,
        }),
      )
    },
  })

  const deletePost = (postId: number) => deletePostMutation.mutate(postId)

  return { deletePost }
}
