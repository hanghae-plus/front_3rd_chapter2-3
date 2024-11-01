import { Post } from "@entities/post/types"
import { fetchPost } from "./fetchPost"

/** 게시물 업데이트 */
export const updatePostApi = async (
  selectedPost: Partial<Post>,
): Promise<Post> => {
  const { id } = selectedPost
  return await fetchPost(`/${id}`, { method: "PUT", body: selectedPost })
}
