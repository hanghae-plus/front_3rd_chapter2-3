import { fetchComment } from "./fetchComment"

export const readCommentApi = async (postId: number) => {
  return await fetchComment(`/post/${postId}`)
}
