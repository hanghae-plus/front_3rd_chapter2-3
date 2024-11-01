import { searchParamsAtom } from "@features/filter/model"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Post, PostResponse } from "@entities/post/model"
import { updatePostApi } from "@entities/post/api"
import { useAtomValue } from "jotai"

export const useMutationPostUpdate = () => {
  const queryClient = useQueryClient()
  const searchParams = useAtomValue(searchParamsAtom)

  const updatePostInCache = (updatedPost: Post, oldData: PostResponse) => ({
    limit: oldData.limit,
    skip: oldData.skip,
    posts: (oldData?.posts || []).map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    ),
    total: oldData?.total || 0,
  })

  const { mutate: updatePost } = useMutation({
    mutationFn: updatePostApi,
    onSuccess: (data: Post) => {
      queryClient.setQueryData(
        ["posts", searchParams],
        (oldData: PostResponse) => updatePostInCache(data, oldData)
      )
    },
  })

  return { updatePost }
} 