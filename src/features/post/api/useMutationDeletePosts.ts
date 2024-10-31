import { useMutation, useQueryClient } from "@tanstack/react-query"

import { fetchDeletePost } from "../../../entities/post/api/postApi"

import { PostFetchReturnType, PostType } from "../../../entities/post/api/types"

const useMutationDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: PostType["id"]) => fetchDeletePost(postId),
    onSuccess: (response: PostType) => {
      queryClient.setQueryData(["posts"], (data: PostFetchReturnType) => {
        const updatedComments = { ...data, posts: data.posts.filter(({ id }) => id != response.id) }

        return updatedComments
      })
    },
  })
}

export default useMutationDeletePost
