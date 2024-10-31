import { useMutation, useQueryClient } from "@tanstack/react-query"

import { fetchAddPost } from "../../../entities/post/api/postApi"

import { AddPostParamsType, PostFetchReturnType } from "../../../entities/post/api/types"

const useMutationAddPost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newPost: AddPostParamsType) => fetchAddPost(newPost),
    onSuccess: (response) => {
      queryClient.setQueryData(["posts"], (data: PostFetchReturnType) => {
        const updatedComments = { ...data, posts: [...data.posts, response] }

        return updatedComments
      })
    },
  })
}

export default useMutationAddPost
