import { useMutation } from "@tanstack/react-query"
import { deletePost } from "../../../entities/post/api"
import { store } from "../../../entities/post/model/store.ts"

export const useMutateDeletePost = () => {
  const { removePosts } = store((state) => state)

  return useMutation({
    mutationFn: (postId: number) => deletePost(postId),
    onSuccess: (_, postId) => {
      removePosts(postId)
    },
    onError: (error) => {
      console.error("게시물 삭제 오류:", error)
    },
  })
}
