import { Post, PostForm, PostQueryResult } from "@entities/post/types"
import { searchParamsAtom } from "@features/searchParams/model/atom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPostApi } from "@entities/post//api"
import { useAtomValue } from "jotai"

// 게시글과 사용자 데이터를 결합하여 반환하는 커스텀 훅
export const usePostCreate = () => {
  const queryClient = useQueryClient()
  const searchParams = useAtomValue(searchParamsAtom)

  const createPostMutation = useMutation({
    mutationFn: createPostApi,
    onSuccess: (data: Post) => {
      const { title, userId, body } = data
      queryClient.setQueryData(
        ["posts", searchParams],
        (oldData: PostQueryResult) => ({
          limit: oldData.limit,
          skip: oldData.skip,
          posts: [
            {
              id: (oldData?.total || 0) + 1,
              title,
              userId,
              body,
              reactions: { likes: 0, dislikes: 0 },
              tags: [],
              views: 0,
            },
            ...(oldData?.posts || []),
          ],
          total: (oldData?.total || 0) + 1,
        }),
      )
    },
  })

  const createPost = (newPost: PostForm) => createPostMutation.mutate(newPost)

  return { createPost }
}
