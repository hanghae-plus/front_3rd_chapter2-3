import { Post, PostResponse } from "@entities/post/model"
import { searchParamsAtom } from "@features/filter/model"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPostApi } from "@entities/post/api"
import { useAtomValue } from "jotai"

export const useMutationPostCreate = () => {
  const queryClient = useQueryClient()
  const searchParams = useAtomValue(searchParamsAtom)

  const addPostToCache = (newPost: Post, oldData: PostResponse) => ({
    limit: oldData.limit,
    skip: oldData.skip,
    posts: [
      {
        id: (oldData?.total || 0) + 1,
        title: newPost.title,
        userId: newPost.userId,
        body: newPost.body,
        reactions: { likes: 0, dislikes: 0 },
        tags: [],
        views: 0,
      },
      ...(oldData?.posts || []),
    ],
    total: (oldData?.total || 0) + 1,
  })

  const { mutate: createPost } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (data: Post) => {
      queryClient.setQueryData(
        ["posts", searchParams],
        (oldData: PostResponse) => addPostToCache(data, oldData)
      )
    },
  })

  return { createPost }
} 