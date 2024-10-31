import { searchParamsAtom } from "@features/filter/model"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PostResponse } from "@entities/post/model"
import { deletePostApi } from "@entities/post/api"
import { useAtomValue } from "jotai"

export const useMutationPostDelete = () => {
  const queryClient = useQueryClient()
  const searchParams = useAtomValue(searchParamsAtom)

  const removePostFromCache = (postId: number, oldData: PostResponse) => ({
    limit: oldData.limit,
    skip: oldData.skip,
    posts: (oldData?.posts || []).filter((post) => post.id !== postId),
    total: oldData?.total ? oldData.total - 1 : 0,
  })

  const { mutate: deletePost } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (postId: number) => {
      queryClient.setQueryData(
        ["posts", searchParams],
        (oldData: PostResponse) => removePostFromCache(postId, oldData)
      )
    },
  })

  return { deletePost }
} 