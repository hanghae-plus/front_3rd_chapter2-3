import { searchParamsAtom } from "@features/searchParams/model/atom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Post, PostQueryResult } from "@entities/post/types"
import { updatePostApi } from "@entities/post/api"
import { useAtomValue } from "jotai"

export const usePostUpdate = () => {
  const queryClient = useQueryClient()
  const searchParams = useAtomValue(searchParamsAtom)

  const updatePostsMutation = useMutation({
    mutationFn: updatePostApi,
    onSuccess: (data: Post) => {
      queryClient.setQueryData(
        ["posts", searchParams],
        (oldData: PostQueryResult) => ({
          limit: oldData.limit,
          skip: oldData.skip,
          posts: (oldData?.posts || []).map((post) =>
            post.id === data.id ? data : post,
          ),
          total: (oldData?.total || 0) + 1,
        }),
      )
    },
  })

  const updatePost = (post: Post) => updatePostsMutation.mutate(post)

  return { updatePost }
}
